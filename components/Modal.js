'use client'

import { useState } from 'react'

export default function Modal({ title, onClose, onSave, fields }) {
  const [formData, setFormData] = useState({})

  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg transition-all duration-300">
        {/* Judul */}
        <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
          {title}
        </h2>

        {/* Input Fields */}
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {field.name}
            </label>
            <input
              type={field.type}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              onChange={(e) => handleChange(e, field.name)}
              placeholder={`Masukkan ${field.name}`}
            />
          </div>
        ))}

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm transition"
          >
            Batal
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-sm transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}
