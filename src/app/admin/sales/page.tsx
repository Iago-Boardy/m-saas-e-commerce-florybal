import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MoreVertical, Package, User, Calendar, DollarSign } from "lucide-react"
import { formatCurrency } from "@/lib/formatters"
import { db } from "@/lib/db"

export default function AdminSalesPage() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 lg:px-8 px-4 py-6 space-y-6">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Vendas</h1>
        </div>
        <SalesTable />
      </main>
    </div>
  )
}

async function SalesTable() {
  const sales = await db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  if (sales.length === 0) return <p>Nenhuma Venda Encontrada.</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Comprador</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sales.map(sale => (
          <TableRow key={sale.id}>
            <TableCell>
              <div className="flex items-center">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                {sale.product.name}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                {sale.user.name || sale.user.email || "N/A"}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                {formatCurrency(sale.pricePaidInCents / 100)}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                sale.createdAt
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Ações</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/sales/${sale.id}`}>
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}