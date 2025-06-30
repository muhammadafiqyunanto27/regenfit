'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (res.ok) {
      router.push('/')
    } else {
      alert('Login gagal. Cek email atau password.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Login ke RegenFit</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 mt-4 rounded hover:bg-emerald-700"
        >
          Masuk
        </button>

        <p className="mt-4 text-center text-sm">
          Belum punya akun? <a href="/register" className="text-emerald-600 hover:underline">Daftar</a>
        </p>
      </form>
    </div>
  )
}
