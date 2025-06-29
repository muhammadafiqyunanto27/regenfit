'use client'

import { useState } from 'react'

export default function Tracking() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmiData, setBmiData] = useState([])
  const [file, setFile] = useState(null)

  const calculateBMI = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w) return alert('Masukkan tinggi dan berat!')

    const bmi = (w / ((h / 100) ** 2)).toFixed(1)
    const today = new Date().toLocaleDateString('id-ID')
    const newData = [...bmiData, { date: today, bmi }]
    setBmiData(newData)
    localStorage.setItem('bmi-history', JSON.stringify(newData))
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      setFile(URL.createObjectURL(selected))
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 max-w-3xl mx-auto bg-white text-gray-800 dark:bg-gray-950 dark:text-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">📊 Tracking BMI & Foto</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Pantau <strong>BMI</strong> dan <strong>perubahan fisik</strong> harian untuk memotivasi dan memantau progresmu.
      </p>

      {/* BMI Calculator */}
      <section className="bg-gray-100 dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Kalkulator BMI</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            placeholder="Tinggi (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Berat (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          onClick={calculateBMI}
          className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded"
        >
          Hitung & Simpan
        </button>
      </section>

      {/* Foto Progress */}
      <section className="bg-gray-100 dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Foto Progres Harian</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3"
        />
        {file && (
          <img
            src={file}
            alt="Foto progres"
            className="max-w-xs rounded shadow border dark:border-gray-700"
          />
        )}
      </section>

      {/* Riwayat BMI */}
      {bmiData.length > 0 && (
        <section className="bg-gray-100 dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Riwayat BMI</h2>
          <ul className="list-disc pl-6 space-y-1">
            {bmiData.map((item, index) => (
              <li key={index}>
                {item.date}: <span className="font-medium">{item.bmi}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
