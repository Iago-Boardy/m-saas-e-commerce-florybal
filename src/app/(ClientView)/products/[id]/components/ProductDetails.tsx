'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Minus, Plus, ShoppingCart, Package, Clock, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Product = {
  id: string
  name: string
  priceInCents: number
  createdAt: Date
  updatedAt: Date
  imagePath: string
  description: string
  details?: string[]
  isAvaliableForPurchase: boolean
}

type ProductDetailsProps = {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1)
    const [isWishlist, setIsWishlist] = useState(false)
    const { data: session } = useSession()
  
    const handleQuantityChange = (action: 'increment' | 'decrement') => {
      if (action === 'increment') {
        setQuantity(prev => prev + 1)
      } else if (action === 'decrement' && quantity > 1) {
        setQuantity(prev => prev - 1)
      }
    }
  
    async function handlePurchase() {
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            priceInCents: product.priceInCents,
            productName: product.name,
            quantity,
          }),
        })
  
        const { sessionId } = await response.json()
        const stripe = await import('@stripe/stripe-js').then((module) => 
          module.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        )
        
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId })
          if (error) {
            console.error('Error:', error)
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  
    // Cálculo do preço total com base na quantidade
    const totalPriceInCents = product.priceInCents * quantity
    const totalPrice = (totalPriceInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  
    return (
      <div className="min-h-screen from-amber-50 to-amber-100">
        <main className="flex-grow-0 pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="flex justify-center items-start sticky top-24">
                <Card className="w-full max-w-md overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={product.imagePath}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="w-full h-auto object-cover duration-300 hover:scale-[1.05]"
                    />
                  </CardContent>
                </Card>
              </div>
  
              {/* Product Details */}
              <div className="flex flex-col space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-amber-900 mb-2">{product.name}</h1>
                  <p className="text-3xl font-semibold text-amber-700">
                    {/* Exibe o preço total baseado na quantidade */}
                    {totalPrice}
                  </p>
                </div>
  
                {/* Product Actions */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-amber-300 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange('decrement')}
                      disabled={quantity === 1}
                      className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-semibold text-amber-900">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange('increment')}
                      className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="flex-grow bg-amber-600 text-white hover:bg-amber-700 transition-colors" onClick={handlePurchase}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Comprar agoora
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`border-amber-600 ${isWishlist ? 'text-red-500' : 'text-amber-600'} hover:bg-amber-100 transition-colors`}
                    onClick={() => setIsWishlist(!isWishlist)}
                  >
                    <Heart className="h-5 w-5" fill={isWishlist ? 'currentColor' : 'none'} />
                  </Button>
                </div>
  
                {/* Product Information Tabs */}
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-amber-100">
                    <TabsTrigger value="description" className="text-amber-900">Descrição</TabsTrigger>
                    <TabsTrigger value="shipping" className="text-amber-900">Envio</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-amber-800 text-lg leading-relaxed">{product.description}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="details" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <ul className="list-disc list-inside space-y-2 text-amber-800">
                          {product.details?.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="shipping" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-amber-800 mb-4">Entrega rápida e segura toda região proxima a Ivoti.</p>
                        <div className="flex items-center space-x-2 text-amber-700 mb-2">
                          <Package className="h-5 w-5" />
                          <span>Frete grátis para compras acima de R$ 200</span>
                        </div>
                        <div className="flex items-center space-x-2 text-amber-700 mb-2">
                          <Clock className="h-5 w-5" />
                          <span>Entrega em 3-5 dias úteis</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
  
                {/* Additional Information */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="warranty">
                    <AccordionTrigger className="text-amber-900">Garantia</AccordionTrigger>
                    <AccordionContent className="text-amber-800">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Garantia de 12 meses diretamente com o fabricante</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
  
                {/* Availability Badge */}
                {product.isAvaliableForPurchase ? (
                  <Badge variant="secondary" className="w-fit bg-green-100 text-green-800">Disponível em estoque</Badge>
                ) : (
                  <Badge variant="secondary" className="w-fit bg-red-100 text-red-800">Fora de estoque</Badge>
                )}
  
                {/* Login Alert */}
                {!session && (
                  <Alert>
                    <AlertDescription>
                      Faça login para aproveitar descontos exclusivos e acompanhar seus pedidos.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  