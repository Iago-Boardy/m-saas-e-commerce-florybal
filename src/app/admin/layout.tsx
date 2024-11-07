import AdminNavbar from "@/components/admin-navbar"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-1 lg:px-8 px-4 py-6">
        {children}
      </main>
    </div>
  )
}