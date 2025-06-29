'use client'

import { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Gunakan useLayoutEffect agar DOM class langsung diset sebelum render
  useLayoutEffect(() => {
    // Hindari error saat rendering di server (Next.js SSR)
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
    } else {
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
  