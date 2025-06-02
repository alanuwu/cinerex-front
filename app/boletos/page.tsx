import TicketCards from "./_components/TicketCard";
import Footer from "../dashboard/_components/Footer";
import Navbar from "../dashboard/_components/Navbar";

export default function Boletos() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
                <TicketCards />
            </div>
            <Footer />
        </div>
    );
}