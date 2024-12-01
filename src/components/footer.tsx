import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function SimpleFooter() {
  return (
    <footer className="bg-amber-100 text-amber-800 py-6 mt-12 border-t border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} ChocolatesdaFlorybal</p>
            <div className="h-4 w-px bg-amber-400"></div>
            <p className="text-xs">Deliciando vidas desde 1991</p>
          </div>
          <div className="flex space-x-4 items-center">
            <Link href="/politica-privacidade" className="text-xs hover:text-amber-600 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/team" className="text-xs hover:text-amber-600 transition-colors">
              Desenvolvedores
            </Link>
            <Link href="https://www.facebook.com/florybalrepresentacoes/?locale=pt_BR" className="hover:text-amber-600 transition-colors">
              <Facebook size={18} />
            </Link>
            <Link href="#" className="hover:text-amber-600 transition-colors">
              <Instagram size={18} />
            </Link>
            <Link href="https://www.instagram.com/gabriel_gaelzer/" className="hover:text-amber-600 transition-colors">
              <Twitter size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}