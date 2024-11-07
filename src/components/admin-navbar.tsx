"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminNavbar() {
    return (
        <header className="border-b w-full">
            <div className="flex h-16 items-center lg:px-8 px-4">
                <div className="flex items-center space-x-4">
                    <Link href="/products" className="text-2xl font-bold">
                        Admin Dashboard
                    </Link>
                </div>
                <nav className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/admin">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/admin/products">Produtos</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/admin/users">Usuários</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}