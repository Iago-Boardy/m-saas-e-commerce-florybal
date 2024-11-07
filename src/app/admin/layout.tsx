import AdminNavbar from "@/components/admin-navbar"
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-1 lg:px-8 px-4 py-6">
        {children}
      </main>
    </div>
    </RoleGate>
  )
}