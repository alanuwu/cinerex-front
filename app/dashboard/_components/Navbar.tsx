'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, UserCircle2 } from 'lucide-react'
import { Customer, User } from '@/entities'
import { API_URL } from '@/constants'
import getRole from '@/app/(auth)/useRole'
import getInformation from '@/app/(auth)/useEmail'
import { useRouter } from 'next/navigation'
import { logout } from '@/actions/logout'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [user, setUser] = useState<User | null>(null)
   const [customer, setCustomer] = useState<Customer | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter();

  const toggleUser = () => setShowUser((prev) => !prev)

  const navItems = [
    { label: 'Inicio', href: '/dashboard' },
    { label: 'Películas', href: '/dashboard/billboard' },
    { label: 'Mis Boletos', href: '/boletos' },
    { label: 'Contacto', href: '/contacto' },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      try {
       const data = await getRole();

        if (data?.user) {
        setUser(data.user);
        setRole(data.user.userRole || null);

        // 🔥 Obtener información extra del usuario, como customer
        const customerData = await getInformation(data.user.userEmail);
        setCustomer(customerData);
      } else {
        setUser(null);
        setRole(null);
        setCustomer(null);
      }
      } catch (err) {
        console.log(err);
        setUser(null);
        setRole(null);
        setCustomer(null);
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
  await logout(); // elimina la cookie desde el servidor
  router.push("/login");
};
  return (
    <nav className="bg-gray-900 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            CineRex
          </Link>

          {/* Desktop Menu */}
          <div className="flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-yellow-400 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            {/* User Icon */}
            <div className="relative ml-4">
              <button
                onClick={toggleUser}
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors focus:outline-none"
                aria-label="Mostrar usuario"
              >
                  <UserCircle2 size={32} />
              </button>
              {showUser && user && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-5">
                  <div className="flex flex-col items-center mb-3">
                    <UserCircle2 size={56} className="text-yellow-400 mb-2" />
                    <div className="text-lg font-bold text-gray-800 mb-1 text-center">
                      {customer?.customerName} {customer?.customerLastName}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone size={16} className="text-green-600" />
                      <span className="text-sm text-green-800 bg-green-100 rounded px-2 py-1 font-mono">
                        {customer?.customerPhoneNumber}
                      </span>
                    </div>
                    <div className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-1 font-mono mb-1 break-all text-center">
                      {user.userEmail}
                    </div>
                    {user.userRoles.includes("Admin") ? (
                      <div className="text-xs text-gray-500 mt-2 flex flex-col items-center gap-2">
                        <span>
                          Rol: <span className="font-semibold text-yellow-600">{user.userRoles}</span>
                        </span>
                        <Link
                          href="/admin"
                          className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-xs font-bold text-gray-900 shadow transition text-center"
                        >
                          Panel de Administrador
                        </Link>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        Rol: <span className="font-semibold">{user.userRoles}</span>
                      </div>
                    )}
                  </div>
                  <button
                    className="w-full mt-2 bg-yellow-400 text-gray-900 rounded px-4 py-2 font-semibold hover:bg-yellow-300 transition"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
