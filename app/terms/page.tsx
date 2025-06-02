import TermsAndConditions from './_components/TermsAndConditions';
import Navbar from '../dashboard/_components/Navbar';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <TermsAndConditions />
      </main>
    </div>
  );
}


