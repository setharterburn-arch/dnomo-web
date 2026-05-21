import { NextResponse } from 'next/server';
import Stripe from 'stripe';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  const { Resend } = require('resend');
  return new Resend(apiKey);
}

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!stripeSecretKey || !webhookSecret) {
      console.error('Missing Stripe configuration');
      return new NextResponse('Stripe not configured', { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, { typescript: true });
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      return new NextResponse('No signature', { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const customerEmail = session.customer_details?.email || 'Unknown';
      const customerName = session.customer_details?.name || 'Unknown';
      const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
      const sessionId = session.id;

      // Send email notification via Resend
      const resend = getResend();
      if (resend) {
        const { data, error } = await resend.emails.send({
          from: 'DNOMO <onboarding@resend.dev>',
          to: ['alfred@alfredsconnection.com'],
          subject: `New Order! - $${amountTotal} - ${customerName}`,
          html: `
            <h1>New DNOMO Order</h1>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Amount:</strong> $${amountTotal}</p>
            <p><strong>Session ID:</strong> ${sessionId}</p>
            <p>Login to Stripe to view full order details.</p>
          `,
        });

        if (error) {
          console.error('Failed to send email:', error);
        } else {
          console.log('Order notification sent:', data?.id);
        }
      } else {
        console.log('Resend not configured, skipping email notification');
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}