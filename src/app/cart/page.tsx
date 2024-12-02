'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateItemQuantity } = useCart()
  const router = useRouter()

  const handleQuantityChange = (itemId: string, action: 'increment' | 'decrement') => {
    updateItemQuantity(itemId, action)
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.priceInCents * item.quantity, 0)
  }

  const handleCheckout = async () => {
    try {
      const sessionId = Math.random().toString(36).substring(2, 15);
      
      
      router.push(`/checkout/${sessionId}`);
    } catch (error) {
      console.error('Erro ao iniciar o checkout:', error);
      alert('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.');
    }
  };
  

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-amber-900 mb-8">Carrinho de Compras</h1>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-amber-300 mb-4" />
              <p className="text-xl text-amber-800 mb-6">Seu carrinho está vazio!</p>
              <Link 
                href="/allProducts" 
                className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors inline-flex items-center"
              >
                Continuar Comprando
                <ArrowLeft className="ml-2 h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow mb-4">
                    <Image
                      src={item.imagePath || '/placeholder.png'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-amber-900">{item.name}</h3>
                      <p className="text-amber-600">
                        {(item.priceInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleQuantityChange(item.productId, 'decrement')}
                        disabled={item.quantity === 1}
                        className="bg-amber-100 text-amber-600 hover:bg-amber-200 p-1 rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold text-amber-900 w-8 text-center">{item.quantity}</span>
                      <Button
                        onClick={() => handleQuantityChange(item.productId, 'increment')}
                        className="bg-amber-100 text-amber-600 hover:bg-amber-200 p-1 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold text-amber-900 mb-4">Resumo do Pedido</h2>
                  <div className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>{((item.priceInCents * item.quantity) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-semibold text-amber-900">
                      <span>Total:</span>
                      <span>{(calculateTotal() / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  </div>
                  <Button onClick={handleCheckout} className="w-full bg-amber-600 text-white hover:bg-amber-700 py-3 rounded-full text-lg font-semibold transition-colors">
                    Finalizar Compra
                  </Button>
                  <Link href="/allProducts" className="block text-center mt-4 text-amber-600 hover:text-amber-800">
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

