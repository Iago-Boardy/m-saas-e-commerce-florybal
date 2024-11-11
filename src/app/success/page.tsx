import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Stripe from 'stripe';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-10-28.acacia',
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Create order in database
      await db.order.create({
        data: {
          pricePaidInCents: session.amount_total!,
          userId: session.metadata?.userId || 'guest',
          productId: session.metadata?.productId!,
        },
      });
    }

    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-amber-900 mb-4">
            Pagamento realizado com sucesso!
          </h1>
          <p className="text-amber-800">
            Obrigado por sua compra. Você receberá um email com os detalhes.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    redirect('/');
  }
}
