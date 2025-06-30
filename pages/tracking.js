'use client'

import { useEffect, useState } from 'react'
import {
  getAllTrackingData,
  addTrackingData,
  deleteTrackingData
} from '@/utils/db.js'

export default function TrackingPage() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmiData, setBmiData] = useState([])
  const [files, setFiles] = useState([])
  const [preview, setPreview] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await getAllTrackingData()
    setBmiData(data)
  }

  const getBmiCategory = (bmi) => {
    const num = parseFloat(bmi)
    if (num < 18.5) return 'Kurus (Underweight)'
    if (num >= 18.5 && num < 25) return 'Normal'
    if (num >= 25 && num < 30) return 'Overweight'
    return 'Obesitas'
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
    setPreview(selectedFiles.map(file => URL.createObjectURL(file)))
  }

  const calculateBMI = async () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w) return alert('Masukkan tinggi dan berat!')

    const bmi = (w / ((h / 100) ** 2)).toFixed(1)
    const today = new Date().toLocaleDateString('id-ID')
    const category = getBmiCategory(bmi)

    const images = await Promise.all(files.map(file => convertToBase64(file)))

    const entry = {
      date: today,
      bmi,
      category,
      images,
    }

    await addTrackingData(entry)
    await loadData()

    // Reset form
    setHeight('')
    setWeight('')
    setFiles([])
    setPreview([])
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      await deleteTrackingData(id)
      await loadData()
    }
  }

  const getAdviceForBmiCategory = (category) => {
  switch (category) {
    case 'Kurus (Underweight)':
      return 'Perlu meningkatkan asupan kalori dengan makanan bergizi tinggi seperti protein, lemak sehat, dan karbohidrat kompleks. Disarankan latihan kekuatan (resistance training) dan tidur cukup.'
    case 'Normal':
      return 'Pertahankan gaya hidup sehat dengan pola makan seimbang dan olahraga teratur minimal 3–5 kali seminggu. Hindari stres dan pantau berat badan secara berkala.'
    case 'Overweight':
      return 'Mulai kurangi asupan makanan tinggi gula & lemak. Perbanyak konsumsi sayur, buah, dan protein tanpa lemak. Lakukan latihan kardio (lari, bersepeda) setidaknya 30–60 menit, 5x seminggu.'
    case 'Obesitas':
      return 'Sangat dianjurkan diet rendah kalori (dengan panduan ahli gizi), batasi gula, gorengan, dan makanan olahan. Lakukan olahraga rutin: kardio intensitas sedang dan latihan kekuatan, serta konsultasi medis jika diperlukan.'
    default:
      return 'Kategori BMI tidak dikenali.'
  }
}


  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto bg-white dark:bg-gray-950 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📊 Tracking BMI & Foto</h1>

      {/* Kalkulator */}
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

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-3"
        />
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {preview.map((src, idx) => (
            <img key={idx} src={src} alt="Preview" className="w-24 h-24 object-cover rounded border dark:border-gray-700" />
          ))}
        </div>

        <button
          onClick={calculateBMI}
          className="mt-4 w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
        >
          Hitung & Simpan
        </button>
      </section>

      {/* Riwayat BMI */}
      {bmiData.length > 0 && (
        <section className="bg-gray-100 dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Riwayat BMI & Foto</h2>
          <ul className="space-y-6">
            {bmiData.map((item) => (
              <li key={item.id} className="border-b pb-4">
                <div className="flex justify-between">
                  <div>
  <p><strong>{item.date}</strong>: BMI {item.bmi} → <span className="italic">{item.category}</span></p>
  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{getAdviceForBmiCategory(item.category)}</p>
</div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Hapus
                  </button>
                </div>
                {item.images?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Progress ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded border dark:border-gray-700"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
