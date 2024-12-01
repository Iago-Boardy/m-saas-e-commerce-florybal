'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

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
  const { addToCart } = useCart()
  const router = useRouter()

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1)
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      priceInCents: product.priceInCents,
      quantity,
      imagePath: product.imagePath,
    })
    router.push('/cart')
  }

  const totalPriceInCents = product.priceInCents * quantity
  const totalPrice = (totalPriceInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Card className="overflow-hidden shadow-lg rounded-xl">
          <CardContent className="p-0">
            <Image
              src={product.imagePath}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">{product.name}</h1>
          <p className="text-3xl font-semibold text-amber-700">{totalPrice}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center border-2 border-amber-300 rounded-md">
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
          <Button 
            className="w-full sm:w-auto flex-grow bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-300" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adicionar ao carrinho
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`border-2 border-amber-600 ${isWishlist ? 'text-red-500' : 'text-amber-600'} hover:bg-amber-100 transition-colors duration-300`}
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart className="h-5 w-5" fill={isWishlist ? 'currentColor' : 'none'} />
          </Button>
        </div>

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-amber-100 rounded-lg">
            <TabsTrigger value="description" className="text-amber-900 data-[state=active]:bg-amber-200 rounded-lg transition-colors duration-300">
              Descrição
            </TabsTrigger>
            <TabsTrigger value="details" className="text-amber-900 data-[state=active]:bg-amber-200 rounded-lg transition-colors duration-300">
              Detalhes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card className="mt-4 bg-white shadow-md">
              <CardContent className="p-4 text-amber-800">{product.description}</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="details">
            <Card className="mt-4 bg-white shadow-md">
              <CardContent className="p-4">
                <ul className="list-disc list-inside space-y-2 text-amber-800">
                  {product.details?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
          <AccordionItem value="warranty">
            <AccordionTrigger className="text-amber-900 hover:text-amber-700 px-4">Garantia</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-amber-800">
              <div className="flex items-center space-x-2">
                <span>Garantia de 12 meses diretamente com o fabricante</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {product.isAvaliableForPurchase ? (
          <Badge variant="secondary" className="bg-green-100 text-green-800 self-start px-3 py-1 text-sm font-medium rounded-full">
            Disponível
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-red-100 text-red-800 self-start px-3 py-1 text-sm font-medium rounded-full">
            Fora de estoque
          </Badge>
        )}

        {!session && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertDescription className="text-amber-800">
              Faça login para aproveitar descontos exclusivos e acompanhar seus pedidos.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

