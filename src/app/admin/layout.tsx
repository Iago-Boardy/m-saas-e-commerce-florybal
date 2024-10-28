export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {                                                       //ADMIN LAYOUT 
  return <> 

    
    <div className="container my-6">{children}</div>
  </>
}