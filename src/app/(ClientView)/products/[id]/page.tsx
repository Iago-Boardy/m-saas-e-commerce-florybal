import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { ProductDetails } from "./components/ProductDetails"
import SimpleFooter from "@/components/footer"
import ProductCard from "@/components/cardCustom"

async function getRelatedProducts() {
  return db.product.findMany({ 
    where: { isAvaliableForPurchase: true }, 
    orderBy: { createdAt: "desc" },
    take: 4  
  })
}

export default async function UniqueProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id }
  })

  if (product == null) return notFound()

  const relatedProducts = await getRelatedProducts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col">
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <ProductDetails product={product} />

          <section className="-mt-[370px]">
            <h2 className="text-3xl font-bold text-amber-900 mb-8">Outros Produtos que Você Pode Gostar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SimpleFooter />
    </div>
  )
}