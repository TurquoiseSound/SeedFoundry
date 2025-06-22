/**
 * Safe fetch wrapper to handle undici connection termination errors
 * Prevents "TypeError: terminated" errors by properly consuming response bodies
 */

interface SafeFetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

/**
 * Safe fetch implementation with proper error handling and body consumption
 */
export async function safeFetch(
  url: string | URL,
  options: SafeFetchOptions = {}
): Promise<Response> {
  const {
    timeout = 30000,
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const fetchWithRetry = async (attempt: number): Promise<Response> => {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        // Ensure redirects are handled properly
        redirect: fetchOptions.redirect || 'follow',
      });

      // Clear timeout on successful response
      clearTimeout(timeoutId);

      // Clone the response to ensure body can be consumed multiple times
      const clonedResponse = response.clone();

      // Consume the original response body to prevent connection termination
      // This prevents the "TypeError: terminated" error
      try {
        await response.arrayBuffer();
      } catch (consumeError) {
        // If consuming fails, that's okay - we have the clone
        console.warn('Failed to consume response body:', consumeError);
      }

      // Return the cloned response for actual use
      return clonedResponse;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle specific error types
      if (error instanceof Error) {
        // Retry on network errors, timeouts, or connection issues
        if (
          (error.name === 'TypeError' && error.message.includes('terminated')) ||
          error.name === 'AbortError' ||
          error.message.includes('fetch failed') ||
          error.message.includes('network error')
        ) {
          if (attempt < retries) {
            console.warn(
              `Fetch attempt ${attempt + 1} failed, retrying in ${retryDelay}ms:`,
              error.message
            );
            
            // Exponential backoff
            await new Promise(resolve => 
              setTimeout(resolve, retryDelay * Math.pow(2, attempt))
            );
            
            return fetchWithRetry(attempt + 1);
          }
        }
      }

      // Re-throw error if not retryable or max retries reached
      throw new FetchError(
        `Fetch failed after ${attempt + 1} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        undefined
      );
    }
  };

  return fetchWithRetry(0);
}

/**
 * Safe fetch for JSON responses with automatic parsing
 */
export async function safeFetchJson<T = any>(
  url: string | URL,
  options: SafeFetchOptions = {}
): Promise<T> {
  const response = await safeFetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new FetchError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response
    );
  }

  try {
    return await response.json();
  } catch (error) {
    throw new FetchError(
      `Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`,
      response.status,
      response
    );
  }
}

/**
 * Safe fetch for text responses
 */
export async function safeFetchText(
  url: string | URL,
  options: SafeFetchOptions = {}
): Promise<string> {
  const response = await safeFetch(url, options);

  if (!response.ok) {
    throw new FetchError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response
    );
  }

  try {
    return await response.text();
  } catch (error) {
    throw new FetchError(
      `Failed to read text response: ${error instanceof Error ? error.message : 'Unknown error'}`,
      response.status,
      response
    );
  }
}

/**
 * Utility function to check if an error is a fetch-related error
 */
export function isFetchError(error: unknown): error is FetchError {
  return error instanceof FetchError;
}

/**
 * Utility function to check if an error is a network/connection error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.name === 'TypeError' ||
      error.name === 'AbortError' ||
      error.message.includes('terminated') ||
      error.message.includes('fetch failed') ||
      error.message.includes('network error') ||
      error.message.includes('connection')
    );
  }
  return false;
}