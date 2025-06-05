import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

// Updated configuration using route segment config
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Missing env.STRIPE_WEBHOOK_SECRET');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;

        // Update user's subscription status in Supabase
        if (userId) {
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
          }
        }
        break;
      }

      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;

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
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}
