import PrivacyNotice from './_components/PrivacyNotice';
import Navbar from '../dashboard/_components/Navbar';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PrivacyNotice />
      </main>
    </div>
  );
}
