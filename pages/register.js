// pages/register.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import bcrypt from 'bcryptjs'

let users = []

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()

    const existing = users.find(u => u.email === email)
    if (existing) return alert('Email sudah digunakan.')

    const hashed = await bcrypt.hash(password, 10)
    users.push({ name, email, password: hashed })
    alert('Berhasil daftar. Silakan login.')
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Daftar Akun</h2>
        <input type="text" placeholder="Nama" required className="input" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded mt-4">Daftar</button>
        <p className="text-center mt-2 text-sm">
          Sudah punya akun? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  )
}
