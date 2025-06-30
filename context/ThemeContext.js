'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext()

// Gunakan hook yang aman untuk SSR (server-side rendering)
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Ambil preferensi awal dari localStorage atau preferensi sistem
  useIsomorphicLayoutEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
    } else {
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // Terapkan class theme ke elemen <html>
  useIsomorphicLayoutEffect(() => {
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
