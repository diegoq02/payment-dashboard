import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        bkg: '#FFFFFF',
        card: '#F8F9FB',
        border: '#E5E7EB',
        'text-prm': '#111827',
        'text-sec': '#6B7280',
        'text-mute': '#9CA3AF',
        accent: '#2563EB',
        'accent-soft': '#DBEAFE',
        emerald: '#10B981',
        rose: '#EF4444',
        violet: '#8B5CF6',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'card-hover': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [],
}

export default config
