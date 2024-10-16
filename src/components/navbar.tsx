import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from './ui/button';

export default function Navbar() {
  const user = undefined;                                                             //In this code of the navbar we're basically configuring the way the navbar is going to act                                                                            
  const isAdmin = false                                                               //Depending if the user is logged or if is an admin
  
  return (
    <header className="w-full bg-amber-50 border-b border-amber-100 fixed top-0 left-0 z-50"> 
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-[16px] font-bold sm:text-2xl">
          <span className="text-amber-900">Chocolates</span>
          <span className="text-amber-600">daFlorybal</span>
        </Link>

        <nav className="flex items-center space-x-6 ">
          {user ? (
            <>
              <Link href="/api/auth/logout" className={buttonVariants({
                size: "sm", variant: "ghost"
              })}>Sair</Link>

              <Link href="/api/auth/logout" className={buttonVariants({
                size: "sm", variant: "ghost"
              })}>Perfil</Link>
              
              {isAdmin ? (<Link href="/api/auth/logout" className={buttonVariants({
                    size: "sm", variant: "ghost"
                  })}>Dashboard ✨</Link>): null}
              <Link href="/products" className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1" 
                  })}>
                    Produtos
                    <ArrowRight className='ml-1.5 h-5 w-5'/>
                  </Link>
            </>
          ) : (
            <>
              <Link href="/api/auth/register" className={buttonVariants({
                size: "sm", variant: "ghost"
              })}>Cadastrar-se</Link>
  
              <Link href="/api/auth/login" className={buttonVariants({
                size: "sm", variant: "ghost"
                })}>
                  Login
                </Link>
                <div className='h-8 w-px bg-zinc-200 hidden sm:block'></div>
              
                <Link href="/products" className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1" 
                  })}>
                    Produtos
                    <ArrowRight className='ml-1.5 h-5 w-5'/>
                  </Link>
            </>
          )}
        </nav>

      </div>
    </header>
  )
}