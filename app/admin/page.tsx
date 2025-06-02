import AdminDashboard from "./_components/AdminDashboard";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
        <AdminDashboard/>
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
