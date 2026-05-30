import type { FC } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export const DashboardLayout: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeAlerts = 3

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar (renders both mobile + desktop) */}
      <Sidebar
        isMobileOpen={menuOpen}
        onCloseMobile={() => setMenuOpen(false)}
        alertsCount={activeAlerts}
      />

      {/* Main content area */}
      <div className="lg:ml-64">
        <Header
          onMenuToggle={() => setMenuOpen(!menuOpen)}
          activeAlerts={activeAlerts}
        />
        <main className="p-4 md:p-8 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
