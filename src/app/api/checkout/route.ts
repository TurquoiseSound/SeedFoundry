import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { priceId, userId } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Verify user exists and get their email
    const { data: user, error: userError } = await supabase!
      .from('users')
      .select('email')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/canceled`,
      customer_email: user.email,
      metadata: {
        userId,
      },
    });

    // Ensure we return a proper response with the session ID
    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    console.error('Checkout error:', error);

    // Handle specific Stripe errors
    if (error && typeof error === 'object' && 'type' in error) {
      interface StripeError {
        message?: string;
        type?: string;
      }
      const stripeError = error as StripeError;
      return NextResponse.json(
        {
          error: 'Payment processing error',
          details: stripeError.message || 'Unknown payment error',
        },
        { status: 400 }
      );
    }

    // Always return a proper response, even on error
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
