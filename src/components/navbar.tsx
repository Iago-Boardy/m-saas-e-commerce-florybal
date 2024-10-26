import Link from 'next/link'
import { ArrowRight, ChevronDown, Clock, LogOut, ShoppingCart, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export default function Navbar() {
  const user = undefined                                                        //In this code of the navbar we're basically configuring the way the navbar is going to act                                                                            
  const isAdmin = false                                                        //Depending if the user is logged or if is an admin
                                                                               //I must take a look about responsivness and also bout the Next Navegation on this page
  
  return (
    <header className="w-full bg-amber-50 border-b border-amber-100 fixed top-0 left-0 z-50"> 
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-[16px] font-bold sm:text-2xl">
          <span className="text-amber-900">Chocolates</span>
          <span className="text-amber-600">daFlorybal</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {user ? (
            <>
            <Link href="/api/auth/logout" className="text-amber-900 hover:text-amber-700 transition-colors">
              Sair
            </Link>
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link 
                  href="#" 
                  className="text-amber-900 hover:text-amber-700 transition-colors flex items-center px-3 py-2 rounded-md focus:outline-none"
                >
                  Perfil
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-amber-50 border shadow-xl rounded-md p-2">
                <DropdownMenuLabel className="text-amber-900 font-semibold px-2 py-1">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-200 my-1" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-amber-100 rounded-md px-2 py-1 cursor-pointer focus:bg-amber-100 focus:outline-none flex items-center">
                    <User className="mr-2 h-4 w-4 text-amber-700 flex-shrink-0" />
                    <Link href="/perfil" className="text-amber-900">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-amber-100 rounded-md px-2 py-1 cursor-pointer focus:bg-amber-100 focus:outline-none flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-amber-700 flex-shrink-0" />
                    <Link href="/historico" className="text-amber-900">Histórico</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-amber-100 rounded-md px-2 py-1 cursor-pointer focus:bg-amber-100 focus:outline-none flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4 text-amber-700 flex-shrink-0" />
                    <Link href="/carrinho" className="text-amber-900">Carrinho</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-amber-200 my-1" />
              </DropdownMenuContent>
            </DropdownMenu>

          
            {isAdmin ? (
              <Link href="/admin" className="text-amber-900 hover:text-amber-700 transition-colors">
                Dashboard ✨
              </Link>
            ) : null}

              <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>
          
            <Link href="/products" className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center">
              Produtos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </>
          
          ) : (
            <>
            <Link href="/api/auth/register" className="text-amber-900 hover:text-amber-700 transition-colors">
              Cadastrar-se
            </Link>

            <Link href="/api/auth/login" className="text-amber-900 hover:text-amber-700 transition-colors">
              Login
            </Link>

            <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>

            <Link href="/products" className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center">
              Produtos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </>
          )}
        </nav>

      </div>
    </header>
  )
}