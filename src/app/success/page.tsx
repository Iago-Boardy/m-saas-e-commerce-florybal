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
    apiVersion: '2024-11-20.acacia',
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verifique se o pagamento foi bem-sucedido e se session.metadata não é null
    if (session.payment_status === 'paid' && session.metadata) {
      // Recupere os IDs dos produtos e o valor total da metadata
      const productIds = session.metadata.productIds?.split(',') || []; // IDs dos produtos no carrinho
      const totalAmount = parseInt(session.metadata.totalAmount || '0', 10); // Total do carrinho

      // Crie o pedido no banco de dados
      await db.order.create({
        data: {
          pricePaidInCents: totalAmount,
          userId: session.metadata?.userId || 'guest',
          productId: productIds.join(','), // Armazene os IDs dos produtos no pedido
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
