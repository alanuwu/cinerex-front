import TicketsDashboard from "./_components/TicketsDashboard";




export default function Ticketpage({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
      <TicketsDashboard/>
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
