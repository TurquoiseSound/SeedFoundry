import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

// Updated configuration using route segment config
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: string;
  
  try {
    // Safely read the request body
    body = await request.text();
  } catch (error) {
    console.error('Failed to read request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const signature = headers().get('stripe-signature');

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('Missing env.STRIPE_WEBHOOK_SECRET');
    }

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;

        // Update user's subscription status in Supabase
        if (userId) {
          try {
            const { error } = await supabase!
              .from('users')
              .update({
                stripe_customer_id: session.customer as string,
                subscription_status: 'active',
                subscription_plan: session.metadata?.plan || 'default',
              })
              .eq('id', userId);

            if (error) {
              console.error('Error updating user subscription:', error);
              // Log but don't fail the webhook - Stripe expects 200
            }
          } catch (dbError) {
            console.error('Database operation failed:', dbError);
            // Log but don't fail the webhook
          }
        }
        break;
      }

      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;

        try {
          // Update subscription status in Supabase
          const { error } = await supabase!
            .from('users')
            .update({
              subscription_status: subscription.status,
              subscription_plan: subscription.metadata?.plan || 'default',
            })
            .eq('stripe_customer_id', subscription.customer as string);

          if (error) {
            console.error('Error updating subscription status:', error);
            // Log but don't fail the webhook
          }
        } catch (dbError) {
          console.error('Database operation failed:', dbError);
          // Log but don't fail the webhook
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always return success to Stripe
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    
    // Handle specific Stripe webhook errors
    if (error && typeof error === 'object' && 'message' in error) {
      const stripeError = error as any;
      if (stripeError.message?.includes('signature')) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }
    
    // Always return a proper response, even on error
    // Return 400 for client errors, but log the actual error
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}