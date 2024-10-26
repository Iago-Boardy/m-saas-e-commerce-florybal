import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'
import SimpleFooter from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-amber-900">
            Delicie-se com os <span className="text-amber-600">Melhores Chocolates</span> da Florybal
            </h1>
            <p className="text-lg text-amber-800">
              Crie sua experiência perfeita de chocolate com nossos doces artesanais especiais. 
              Não é apenas um doce, mas uma memória deliciosa.
            </p>
            <ul className="space-y-2">
              {['Ingredientes premium de origem ética', 'Sabores de dar água na boca', 'Entrega para todo o Rio Grande do Sul'].map((feature, index) => (
                <li key={index} className="flex items-center text-amber-700">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            
            <Link 
              href="/products" 
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition duration-300">
              Ver Nossos Produtos
            </Link>
            
            
          </div>

          <div className="lg:w-1/2 relative">
            <div className="w-full max-w-md mx-auto aspect-[3/4] relative bg-amber-200 rounded-3xl shadow-xl overflow-hidden">
              <Image
                src="/images/florybal.jpg"
                alt="Custom chocolate bar"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Há 30 anos trazendo felicidade</p>
            </div>
          </div>

        </div>
      </main>
      <SimpleFooter/>
    </div>
  )
}