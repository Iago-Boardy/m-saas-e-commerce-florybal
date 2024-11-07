"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, CreditCard, DollarSign, Users } from "lucide-react"



export default function AdminHome() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 lg:px-8 px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Sales" subtitle="R$200" body="yea, thats it" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} />
          <DashboardCard title="Users" subtitle="1,200" body="Total users" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
          <DashboardCard title="Events" subtitle="150" body="Total events" icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />} />
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
