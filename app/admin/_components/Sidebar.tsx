'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { UserCircle2, Phone, LayoutDashboard, Film, Ticket, LogOut, Users, Calendar } from 'lucide-react'
import { Customer, User } from '@/entities'
import getRole from '@/app/(auth)/useRole'
import getInformation from '@/app/(auth)/useEmail'

const Sidebar = () => {
  const [showUser, setShowUser] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [role, setRole] = useState<string | null>(null)

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Películas', href: '/admin/movies', icon: <Film size={20} /> },
     { label: 'Funciones', href: '/admin/showtimes', icon: <Calendar size={20} /> },
    { label: 'Boletos', href: '/admin/tickets', icon: <Ticket size={20} /> },
    { label: 'Usuarios', href: '/admin/users', icon: <Users size={20} /> },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getRole()
        if (data?.user) {
          setUser(data.user)
          setRole(data.user.userRole || null)
          const customerData = await getInformation(data.user.userEmail)
          setCustomer(customerData)
        } else {
          setUser(null)
          setRole(null)
          setCustomer(null)
        }
      } catch (err) {
        setUser(null)
        setRole(null)
        setCustomer(null)
      }
    }
    fetchUser()
  }, [])

  return (
    <aside className="h-screen w-72 bg-gray-900 border-r border-gray-800 flex flex-col justify-between fixed top-0 left-0 z-40">
      {/* Top: Logo & Nav */}
      <div>
        <div className="flex items-center gap-3 px-6 py-6">
          <UserCircle2 size={36} className="text-yellow-400" />
          <span className="text-2xl font-bold text-yellow-400 tracking-tight">CineRex Admin</span>
        </div>
        <nav className="mt-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-yellow-400 hover:text-gray-900 font-medium transition"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Bottom: User Info */}
      <div className="px-6 py-6 border-t border-gray-800 relative">
        <button
          onClick={() => setShowUser((prev) => !prev)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <UserCircle2 size={32} className="text-yellow-400" />
          <div className="flex-1 text-left">
            <div className="font-semibold text-gray-100 text-base truncate">
              {customer?.customerName} {customer?.customerLastName}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Phone size={14} className="text-green-600" />
              <span className="text-xs text-green-800 bg-green-100 rounded px-2 py-0.5 font-mono truncate">
                {customer?.customerPhoneNumber}
              </span>
            </div>
            <div className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-0.5 font-mono mt-1 break-all truncate">
              {user?.userEmail}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Rol: <span className="font-semibold">{user?.userRoles}</span>
            </div>
          </div>
        </button>
        {/* Panel desplegable animado */}
        <div
          className={`absolute left-0 bottom-20 w-full transition-all duration-300 ${
            showUser && user ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {showUser && user && (
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mx-2 flex flex-col items-center animate-fade-in-down">
              <UserCircle2 size={56} className="text-yellow-400 mb-2" />
              <div className="text-lg font-bold text-gray-800 mb-1 text-center">
                {customer?.customerName} {customer?.customerLastName}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Phone size={18} className="text-green-600" />
                <span className="text-base text-green-800 bg-green-100 rounded px-2 py-1 font-mono">
                  {customer?.customerPhoneNumber}
                </span>
              </div>
              <div className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-1 font-mono mb-1 break-all text-center">
                {user.userEmail}
              </div>
              {user.userRoles.includes("Admin") && (
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
              )}
              <button className="w-full mt-4 bg-yellow-400 text-gray-900 rounded px-4 py-2 font-semibold hover:bg-yellow-300 transition flex items-center justify-center gap-2">
                <LogOut size={18} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
