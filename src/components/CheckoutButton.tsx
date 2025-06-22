'use client';

import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';

import { safeFetchJson, isFetchError, isNetworkError } from '@/lib/safeFetch';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface CheckoutButtonProps {
  priceId: string;
  userId: string;
  className?: string;
  children: React.ReactNode;
}

export default function CheckoutButton({
  priceId,
  userId,
  className,
  children,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use safe fetch to handle connection issues
      const data = await safeFetchJson('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userId }),
        timeout: 10000, // 10 second timeout
        retries: 2,     // Retry twice on network errors
      });

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.sessionId) {
        throw new Error('No session ID returned from checkout API');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      
      let errorMessage = 'Failed to initiate checkout. Please try again.';
      
      if (isFetchError(error)) {
        if (error.status === 400) {
          errorMessage = 'Invalid checkout request. Please check your information.';
        } else if (error.status === 404) {
          errorMessage = 'User not found. Please log in again.';
        } else if (error.status >= 500) {
          errorMessage = 'Server error. Please try again in a moment.';
        }
      } else if (isNetworkError(error)) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleCheckout} 
        disabled={loading} 
        className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Processing...' : children}
      </button>
      {error && (
        <div className="mt-2 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}