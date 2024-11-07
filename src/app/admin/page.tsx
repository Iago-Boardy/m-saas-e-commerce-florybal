
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { CalendarDays, CreditCard, DollarSign, Users } from "lucide-react"

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: {pricePaidInCents: true},
        _count: true
    })

    return {
        amount: data._sum.pricePaidInCents || 0,
        numberOfSales: data._count
    }
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    await db.order.aggregate({
      _sum: { pricePaidInCents: true}
    })
  ])

  return {
    userCount,
    avarageValuePerUser: userCount === 0 ? 0: (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all ([
    db.product.count({where: { isAvaliableForPurchase: true}}),
    db.product.count({where: { isAvaliableForPurchase: false}}),
  ])

  return {
    activeCount,
    inactiveCount
  }
}

export default async function AdminHome() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData() 
  ])

  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 lg:px-8 px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.numberOfSales)} Pedidos`} body={formatCurrency(salesData.amount)} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} />
        <DashboardCard title="Clientes" subtitle={`${formatCurrency(userData.avarageValuePerUser)} Valor médio`} body={formatNumber(userData.userCount)} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <DashboardCard title="Produtos" subtitle={`${formatNumber(productData.inactiveCount)} Valor médio`} body={formatNumber(productData.activeCount)} icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} />

        </div>
      </main>
    </div>
  )
}

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
  icon: React.ReactNode 
}

function DashboardCard({ title, subtitle, body, icon }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{subtitle}</div>
        <p className="text-xs text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  )
}
