'use client'

import { useTheme } from '../context/ThemeContext'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/tracking', label: 'Tracking' },
    { href: '/todos', label: 'To-Do' },
    { href: '/history', label: 'History' },
  ]

  const isActive = (href) => pathname === href

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-black dark:via-neutral-900 dark:to-black text-gray-900 dark:text-gray-100 transition-all">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white dark:bg-neutral-900 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/regenfit-logo.png"
            alt="RegenFit Logo"
            className="w-10 h-10 object-contain rounded-md"
          />
          <h1 className="text-xl sm:text-2xl font-bold">RegenFit</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex flex-1 justify-center space-x-4 text-sm sm:text-base font-medium">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1 rounded transition-colors ${
                isActive(href)
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Theme Toggle + Burger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="text-xl hover:scale-110 transition-transform"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
            aria-label="Toggle Navigation"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-neutral-900 text-center px-4 py-3 space-y-2 text-sm font-medium border-b border-gray-200 dark:border-gray-800 transition-all">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block rounded px-3 py-2 transition-colors ${
                isActive(href)
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      {/* Konten Utama */}
      <main className="p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  )
}
