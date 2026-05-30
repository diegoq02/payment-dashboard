import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  Settings,
  X
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Resumen', path: '/' },
  { icon: Building2, label: 'Instituciones', path: '/institutions' },
  { icon: TrendingUp, label: 'Mercado Cambiario', path: '/fx-market' },
  { icon: Settings, label: 'Configuración', path: '/settings' },
]

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  alertsCount?: number;
}

export const Sidebar: FC<SidebarProps> = ({ isMobileOpen, onCloseMobile, alertsCount = 0 }) => {
  return (
    <>
      {/* ───── MOBILE: Slide-over (only when open) ───── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Dark backdrop - z-40 goes behind header (z-30) but above content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Slide-in panel - z-[70] above backdrop */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white/95 backdrop-blur-md shadow-2xl border-r border-gray-200 z-[70] flex flex-col md:hidden"
            >
              {/* Mobile Sidebar Header with close button */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PS</span>
                  </div>
                  <span className="font-semibold text-gray-800">Payment System</span>
                </div>
                <button
                  onClick={onCloseMobile}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Mobile Alerts + Footer */}
              <div className="p-4 border-t border-gray-100 space-y-4">
                {alertsCount > 0 && (
                  <div className="bg-red-50 text-red-700 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Alertas activas</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {alertsCount}
                    </span>
                  </div>
                )}
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 font-medium">Datos actualizados</p>
                  <p className="text-xs text-gray-400">{new Date().toLocaleDateString('es-PE')}</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ───── DESKTOP: Permanent sidebar (always visible on md+) ───── */}
      <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 z-20 hidden md:flex flex-col">
        {/* Desktop Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <span className="font-semibold text-gray-800">Payment System</span>
          </div>
        </div>

        {/* Desktop Navigation */}
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
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 font-medium">Datos actualizados</p>
            <p className="text-xs text-gray-400">{new Date().toLocaleDateString('es-PE')}</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
