
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { CheckCircle2, CreditCard, DollarSign, MoreVertical, Users, XCircle } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { db } from "@/lib/db"
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "@/components/ProductActions"



export default function AdminProductPages() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 lg:px-8 px-4 py-6 space-y-6">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Produtos</h1>
          <Button asChild>
            <Link href="/admin/products/new">Adicione um Produto</Link>
          </Button>
        </div>
        <ProductsTable />
      </main>
    </div>
  )
}


async function ProductsTable() {
  const products = await db.product.findMany({ 
    select: {
     id: true, 
     name: true, 
     priceInCents: true, 
     isAvaliableForPurchase: true, 
     _count: { select: { orders: true}}  
    },
    orderBy: { name: "asc"}
  })

  if (products.length === 0) return <p>Nenhum Produto Encontrado.</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Disponível para Compra</span>
          </TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Pedidos</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvaliableForPurchase ? (
                <>
                  <span className="sr-only">Disponível</span>
                  <CheckCircle2 className="text-green-500" />
                </>
              ) : (
                <>
                  <span className="sr-only">Indisponível</span>
                  <XCircle className="text-red-500" />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>

            <TableCell>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>Editar</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  
                  <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvaliableForPurchase}/>

                  <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0}/>
                    
                </DropdownMenuContent>
              </DropdownMenu>

            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}