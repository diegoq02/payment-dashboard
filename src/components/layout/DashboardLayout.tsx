import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export const DashboardLayout: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="p-4 md:p-8 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  )
}