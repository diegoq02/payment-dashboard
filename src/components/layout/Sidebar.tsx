import type { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Building2, TrendingUp, Settings } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Resumen', path: '/' },
  { icon: Building2, label: 'Instituciones', path: '/institutions' },
  { icon: TrendingUp, label: 'Mercado Cambiario', path: '/fx-market' },
  { icon: Settings, label: 'Configuración', path: '/settings' },
]

export const Sidebar: FC = () => {
  const location = useLocation()

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 z-50 hidden md:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PS</span>
          </div>
          <span className="font-semibold text-gray-800">Payment System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`
            }
          >
            <item.icon
              className={`w-5 h-5 transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-gray-400'
              }`}
            />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 font-medium">Datos actualizados</p>
          <p className="text-xs text-gray-400">
            {new Date().toLocaleDateString('es-PE')}
          </p>
        </div>
      </div>
    </aside>
  )
}