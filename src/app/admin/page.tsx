'use client'

import * as React from 'react'
import { BarChart3, LayoutDashboard, Settings, ShoppingCart, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-secondary/10 p-4">
          <DashboardContent />
        </main>
      </div>
    </SidebarProvider>
  )
}

function DashboardSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', isActive: true },
    { icon: Users, label: 'Users' },
    { icon: ShoppingCart, label: 'Products' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LayoutDashboard className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Admin Dashboard</span>
                <span className="text-xs">Manage your app</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

function DashboardContent() {
  const { isMobile } = useSidebar()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {isMobile && <SidebarTrigger />}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Users"
          value="10,483"
          description="2.5% increase from last month"
        />
        <DashboardCard
          title="Total Revenue"
          value="$54,237"
          description="4.3% increase from last month"
        />
        <DashboardCard
          title="Active Products"
          value="1,429"
          description="12 new products added this week"
        />
        <DashboardCard
          title="Conversion Rate"
          value="3.42%"
          description="0.8% increase from last week"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Activity log will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardCard({ title, value, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}