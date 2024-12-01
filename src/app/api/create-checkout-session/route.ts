import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Ensure you have the Stripe library installed: npm install stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const cartItems = await request.json();
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.productName,
          },
          unit_amount: item.priceInCents, // Stripe expects amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    })

    // Return the session ID
    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe Checkout Error:', error)
    
    // More detailed error logging
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Internal Server Error', error: error.message }, 
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Unknown error occurred' }, 
      { status: 500 }
    )
  }
}