// app/contacto/page.tsx
import ContactoPage from './_components/ContactoPage'
import Navbar from '../dashboard/_components/Navbar'
import Footer from '../dashboard/_components/Footer'

export default function Contacto() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ContactoPage />
      </main>
      <Footer />
    </div>
  )
}
