import TermsAndConditions from './_components/TermsAndConditions';
import Navbar from '../dashboard/_components/Navbar';
import Footer from '../dashboard/_components/Footer'

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <TermsAndConditions />
      </main>
      <Footer />
    </div>
  );
}
