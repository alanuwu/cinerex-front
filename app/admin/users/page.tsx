import UserDashboard from "./_components/UserDashboard";




export default function UserPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
  <UserDashboard/>
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
