import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/formatters"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import SimpleFooter from "@/components/footer"
import ProductCard from "@/components/cardCustom"

async function getRelatedProducts() {
  return db.product.findMany({ 
    where: { isAvaliableForPurchase: true }, 
    orderBy: { createdAt: "desc" },
    take: 4  
  })
}

export default async function PurchasePage({ params: { id } }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id }
  })

  if (product == null) return notFound()

  const relatedProducts = await getRelatedProducts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col">
      <main className="flex-grow pt-20 pb-12">
        <h1>TESTE TESTE TESTE ESSA E A PAGINA DE COMPRAR PRODUTOS ONDE TEMQ CONFUGRAR O STRIPE</h1>
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-square">
                  <Image 
                    src={product.imagePath} 
                    alt={product.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-amber-900 mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-amber-600 mb-6">
                  {formatCurrency(product.priceInCents / 100)}
                </p>
                <p className="text-amber-800 text-lg mb-8">{product.description}</p>
                <div className="flex gap-4">
                  <Button asChild className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold py-6 rounded-full transition-colors duration-300">
                    <Link href={`/products/${product.id}/purchase`}>
                      Comprar Agora
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-100 text-lg font-semibold py-6 rounded-full transition-colors duration-300">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16">
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