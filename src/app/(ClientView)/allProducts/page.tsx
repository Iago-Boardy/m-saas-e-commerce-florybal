import SimpleFooter from '@/components/footer'
import ProductCard from '@/components/cardCustom'
import { db } from '@/lib/db'
import { Product } from '@prisma/client'

function getNewestProducts() {
  return db.product.findMany({ 
    where: { isAvaliableForPurchase: true }, 
    orderBy: { createdAt: "desc" },
  })
}

export default async function AllProducts() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <main className="flex-grow pt-20">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <ProductGridSection title="Produtos Recentes" productsFetcher={getNewestProducts} />
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

async function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold text-amber-900 mb-8">Todos os Produtos</h1>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {(await productsFetcher()).map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
