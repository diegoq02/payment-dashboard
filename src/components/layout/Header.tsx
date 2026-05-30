import type { FC } from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  activeAlerts: number;
}

export const Header: FC<HeaderProps> = ({ onMenuToggle, activeAlerts }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Toggle (Left side) */}
        <button
          onClick={onMenuToggle}
          className="relative p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6 text-gray-600" />
          {activeAlerts > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar métricas, instituciones..."
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
          />
        </div>

        {/* Mobile Logo (when sidebar hidden) */}
        <div className="md:hidden">
          <span className="text-sm font-semibold text-gray-800">
            Payment System
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Desktop Bell */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors hidden md:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
        <div className="w-px h-6 bg-gray-200 hidden md:block" />
        <button className="flex items-center space-x-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
