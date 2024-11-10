import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import SimpleFooter from '@/components/footer'
import ProductCard from '@/components/cardCustom'
import { db } from '@/lib/db'
import { Product } from '@prisma/client'
import { Button } from '@/components/ui/button'


const products = [
  { id: 1, name: 'Trufa de Chocolate', price: 'R$ 5,99', image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Barra de Chocolate ao Leite', price: 'R$ 12,99', image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Bombom Recheado', price: 'R$ 3,99', image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Chocolate Amargo 70%', price: 'R$ 15,99', image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'Caixa de Pralinés', price: 'R$ 29,99', image: '/placeholder.svg?height=200&width=200' },
  { id: 6, name: 'Chocolate com Avelã', price: 'R$ 18,99', image: '/placeholder.svg?height=200&width=200' },
  { id: 7, name: 'Barra de Chocolate Branco', price: 'R$ 13,99', image: '/placeholder.svg?height=200&width=200' },
  { id: 8, name: 'Trufas Sortidas', price: 'R$ 39,99', image: '/placeholder.svg?height=200&width=200' },
]

function getMostPopularProducts() {
  return db.product.findMany({ 
    where: {isAvaliableForPurchase: true}, 
    orderBy: { orders: {_count: "desc" } },
    take: 8 
  })
}

function getNewestProducts() {
  return db.product.findMany({ 
    where: {isAvaliableForPurchase: true}, 
    orderBy: { createdAt: "desc"},
    take: 4  
  })
}

export default async function ProductsPage() {

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">

      <main className="flex-grow pt-20">       


        <section className="max-w-7xl mx-auto px-4 py-12">

            <ProductGridSection title='Produtos Recentes' productsFetcher={getNewestProducts}/>
        </section>


        <section className="bg-amber-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <Image
              src="/images/panetone.webp"
              alt="Banner promocional"
              width={1200}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">          
          <ProductGridSection title='Produtos Populares' productsFetcher={getMostPopularProducts}/>
          
        </section>

        <section className="bg-amber-200 py-16 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-amber-900 mb-4">Experimente Nossa Coleção Especial</h2>
                <p className="text-amber-800 mb-6">Descubra sabores únicos e irresistíveis em nossa linha premium de chocolates artesanais.</p>
                <Link 
                  href="/colecao-especial" 
                  className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors inline-flex items-center"
                >
                  Ver Coleção Especial
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="md:w-1/2">
                <Image
                  src="/images/chocolate.webp"
                  alt="Coleção Especial de Chocolates"
                  width={500}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      <SimpleFooter />
    </div>
  )
}

type ProductGridSectionProps = {
  title: string,
  productsFetcher: () => Promise<Product[]>
}

async function ProductGridSection( {productsFetcher, title}: ProductGridSectionProps) {
  return(
    <div className="space-y-4">
      <div className='flex gap-4'>
      <h1 className="text-3xl font-bold text-amber-900 mb-8">{title}</h1>
      <Button asChild className="inline-flex items-center justify-center gap-2 bg-amber-600 text-[14px] text-white px-6 py-3 rounded-full hover:bg-amber-700 transition duration-300">
        <Link href="/products/allProducts">
          <span className="font-medium">Ver todos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>

      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {(await productsFetcher()).map(product => (
          <ProductCard key={product.id} {...product}/>
        ))}
        
      </div>
    </div>
  )
  
}

//grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8