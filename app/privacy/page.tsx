import PrivacyNotice from './_components/PrivacyNotice';
import Footer from '../dashboard/_components/Footer';
import Navbar from '../dashboard/_components/Navbar';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PrivacyNotice />
      </main>
      <Footer />
    </div>
  );
}
