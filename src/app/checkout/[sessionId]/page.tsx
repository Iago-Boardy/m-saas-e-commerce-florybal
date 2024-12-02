'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
  const { cart } = useCart()
  const router = useRouter()
  const params = useParams()
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    if (params.sessionId) {
      setSessionId(params.sessionId as string)
    }
  }, [params.sessionId])

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.priceInCents * item.quantity, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Processando pagamento para a sessão:', sessionId)
    alert('Pagamento processado com sucesso!')
    router.push('/confirmation')
  }

  if (!sessionId) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-amber-900 mb-8">Finalizar Compra e Entrega</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold text-amber-900 mb-4">Informações de Entrega e Pagamento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-amber-800">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-amber-800">Endereço</Label>
                    <Input id="address" placeholder="Rua, número" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="complement" className="text-amber-800">Complemento</Label>
                    <Input id="complement" placeholder="Apartamento, bloco, etc. (opcional)" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-amber-800">Cidade</Label>
                      <Input id="city" placeholder="Sua cidade" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-amber-800">Estado</Label>
                      <Input id="state" placeholder="Seu estado" required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-amber-800">CEP</Label>
                    <Input id="postalCode" placeholder="00000-000" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="text-amber-800">Nome no Cartão</Label>
                    <Input id="cardName" placeholder="Nome como está no cartão" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-amber-800">Número do Cartão</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-amber-800">Data de Expiração</Label>
                      <Input id="expiryDate" placeholder="MM/AA" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-amber-800">CVV</Label>
                      <Input id="cvv" placeholder="123" required className="mt-1" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-amber-600 text-white hover:bg-amber-700 py-3 rounded-full text-lg font-semibold transition-colors">
                    Pagar {(calculateTotal() / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Button>
                </form>
              </div>
              <Link 
                href="/cart" 
                className="text-amber-600 hover:text-amber-800 inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar para o Carrinho
              </Link>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-amber-900 mb-4">Resumo do Pedido</h2>
                <div className="space-y-4 mb-4">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4">
                      <Image
                        src={item.imagePath || '/placeholder.png'}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-amber-900">{item.name}</h3>
                        <p className="text-sm text-amber-600">
                          {item.quantity} x {(item.priceInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                      </div>
                      <span className="font-semibold text-amber-900">
                        {((item.priceInCents * item.quantity) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold text-amber-900">
                    <span>Total:</span>
                    <span>{(calculateTotal() / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

