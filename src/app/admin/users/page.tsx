import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MoreVertical, Mail, ShoppingBag, DollarSign } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { db } from "@/lib/db"

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 lg:px-8 px-4 py-6 space-y-6">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Usuários</h1>
        </div>
        <UsersTable />
      </main>
    </div>
  )
}

async function UsersTable() {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
        },
      },
    },
    orderBy: { name: "asc" },
  })

  if (users.length === 0) return <p>Nenhum Usuário Encontrado.</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Pedidos</TableHead>
          <TableHead>Total Gasto</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map(user => {
          const totalOrders = user.orders.length
          const totalSpent = user.orders.reduce((sum, order) => sum + order.pricePaidInCents, 0)

          return (
            <TableRow key={user.id}>
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  {user.email || "N/A"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                  {formatNumber(totalOrders)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  {formatCurrency(totalSpent / 100)}
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
                      <Link href={"#"}>Sem ações disponíveis</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}