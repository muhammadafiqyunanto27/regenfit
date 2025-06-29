'use client'

import { useEffect, useState } from 'react'
import {
  getExercises,
  addExercise,
  deleteExercise,
  updateExercise,
  clearExercises
} from '../utils/db'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const PLAN = [
  { day: 'Senin', exercises: [
    { muscle: 'Dada', name: 'Push‑Up (Lutut)', sets: 4, reps: '15', desc: 'Push-up dengan lutut menyentuh lantai, aman untuk core.' },
    { muscle: 'Dada', name: 'Incline Push‑Up', sets: 3, reps: '12', desc: 'Tangan di meja/bangku, ringan untuk dada.' },
    { muscle: 'Core', name: 'Dead Bug', sets: 3, reps: '10 per sisi', desc: 'Latih stabilitas core sambil berbaring.' },
    { muscle: 'Core', name: 'Pelvic Tilt', sets: 3, reps: '12', desc: 'Kencangkan otot perut bagian bawah sambil telentang.' },
    { muscle: 'Cardio', name: 'Jalan Cepat', sets: 1, reps: '25 menit', desc: 'Jalan cepat santai, pembakar lemak aman GERD.' },
  ]},
  { day: 'Selasa', exercises: [
    { muscle: 'Punggung', name: 'Dumbbell Row', sets: 4, reps: '10', desc: 'Tarik dumbbell ke pinggang, punggung lurus.' },
    { muscle: 'Bicep', name: 'Hammer Curl', sets: 3, reps: '12', desc: 'Dumbbell curl dengan telapak menghadap ke dalam.' },
    { muscle: 'Core', name: 'Side Plank', sets: 3, reps: '30 detik/sisi', desc: 'Latih pinggul dan perut samping.' },
    { muscle: 'Cardio', name: 'Incline Treadmill Walk', sets: 1, reps: '20 menit', desc: 'Simulasi jalur naik gunung ringan.' },
  ]},
  { day: 'Rabu', exercises: [
    { muscle: 'Kaki', name: 'Bodyweight Squat', sets: 4, reps: '15', desc: 'Jaga lutut tidak melewati ujung jari.' },
    { muscle: 'Kaki', name: 'Reverse Lunge', sets: 3, reps: '12 per kaki', desc: 'Langkah mundur, ringan untuk perut.' },
    { muscle: 'Core', name: 'Bird Dog', sets: 3, reps: '10 per sisi', desc: 'Latih punggung bawah dan core.' },
    { muscle: 'Cardio', name: 'Jogging Ringan', sets: 1, reps: '25 menit', desc: 'Lari pelan-pelan jaga napas tetap stabil.' },
  ]},
  { day: 'Kamis', exercises: [
    { muscle: 'Bahu', name: 'Dumbbell Shoulder Press', sets: 3, reps: '10', desc: 'Angkat beban dari bahu ke atas.' },
    { muscle: 'Bahu', name: 'Front Raise', sets: 3, reps: '12', desc: 'Angkat dumbbell ke depan bahu.' },
    { muscle: 'Core', name: 'Glute Bridge', sets: 3, reps: '15', desc: 'Latih glute dan perut bagian bawah.' },
    { muscle: 'Cardio', name: 'Skipping Ringan', sets: 3, reps: '1 menit', desc: 'Lompat tali ringan.' },
    { muscle: 'Recovery', name: 'Stretching Aktif', sets: 1, reps: '10 menit', desc: 'Pemulihan otot dan fleksibilitas.' },
  ]},
  { day: 'Jumat', exercises: [
    { muscle: 'Full‑Body', name: 'Burpee (modifikasi)', sets: 3, reps: '10', desc: 'Burpee tanpa lompatan keras, stabilkan core.' },
    { muscle: 'Core', name: 'Plank', sets: 3, reps: '45 detik', desc: 'Posisi lurus, fokus pada stabilitas core.' },
    { muscle: 'Kaki', name: 'Step-Up', sets: 3, reps: '12 per kaki', desc: 'Langkah ke bangku, persiapan naik gunung.' },
    { muscle: 'Dada', name: 'Wall Push‑Up', sets: 3, reps: '12', desc: 'Push-up ringan di dinding.' },
    { muscle: 'Cardio', name: 'Trekking Simulasi', sets: 1, reps: '30 menit', desc: 'Naik tangga atau tanjakan ringan.' },
  ]},
  { day: 'Sabtu', exercises: [
    { muscle: 'Kaki', name: 'Calf Raise', sets: 3, reps: '20', desc: 'Latih otot betis naik turun perlahan.' },
    { muscle: 'Kaki/Cardio', name: 'Stair Climb', sets: 3, reps: '1 menit', desc: 'Simulasi tanjakan bertingkat.' },
    { muscle: 'Core', name: 'Leg Raise', sets: 3, reps: '15', desc: 'Angkat kaki lurus ke atas.' },
    { muscle: 'Cardio', name: 'Power Walk', sets: 1, reps: '30 menit', desc: 'Jalan cepat intensitas sedang.' },
  ]},
  { day: 'Minggu', exercises: [
    { muscle: 'Recovery', name: 'Stretching / Yoga', sets: 1, reps: '30 menit', desc: 'Fokus fleksibilitas dan relaksasi otot.' },
    { muscle: 'Pernapasan', name: 'Latihan Pernapasan Dalam', sets: 1, reps: '10 menit', desc: 'Atur napas diafragma, bantu GERD & fokus.' },
  ]},
]

export default function Schedule() {
  const [ex, setEx] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ day: '', muscle: '', name: '', sets: '', reps: '', desc: '' })
  const [editId, setEditId] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    (async () => {
      const existing = await getExercises()
      if (existing.length === 0) {
        for (const plan of PLAN) {
          for (const e of plan.exercises) {
            await addExercise({ day: plan.day, ...e })
          }
        }
      }
      const updated = await getExercises()
      setEx(updated)
      setLoading(false)
    })()
  }, [])

  const grouped = ex.reduce((acc, curr) => {
    acc[curr.day] = acc[curr.day] || []
    acc[curr.day].push(curr)
    return acc
  }, {})

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.day || !form.name || !form.muscle) return alert('Isi semua kolom!')

    if (editId) {
      await updateExercise({ ...form, id: editId })
      setEditId(null)
    } else {
      await addExercise(form)
    }
    const updated = await getExercises()
    setEx(updated)
    setForm({ day: '', muscle: '', name: '', sets: '', reps: '', desc: '' })
    setShowModal(false)
  }

  const handleEdit = item => {
    setForm(item)
    setEditId(item.id)
    setShowModal(true)
  }

  const handleDelete = async id => {
    if (confirm('Hapus latihan ini?')) {
      await deleteExercise(id)
      const updated = await getExercises()
      setEx(updated)
    }
  }

  const handleReset = async () => {
    if (confirm('Reset ke default semua data?')) {
      await clearExercises()
      for (const plan of PLAN) {
        for (const e of plan.exercises) {
          await addExercise({ day: plan.day, ...e })
        }
      }
      const updated = await getExercises()
      setEx(updated)
    }
  }

const handleExportPDF = () => {
  const doc = new jsPDF()
  const marginLeft = 14
  const titleFontSize = 16
  const sectionFontSize = 13
  const spacingBetweenTables = 12

  let currentY = 20

  doc.setFont('helvetica')
  doc.setFontSize(titleFontSize)
  doc.text('Jadwal Latihan Mingguan – RegenFit', marginLeft, currentY)
  currentY += 10

  Object.keys(grouped).forEach(day => {
    const exercises = grouped[day].map(e => ({
      muscle: e.muscle,
      name: e.name.replace(/\u2011|\u2013|\u2014|\u2212/g, '-'), // Ganti karakter non-standar dengan -
      sets: e.sets,
      reps: e.reps,
      desc: e.desc
    }))

    if (currentY > 270) {
      doc.addPage()
      currentY = 20
    }

    doc.setFontSize(sectionFontSize)
    doc.text(day, marginLeft, currentY)
    currentY += 4

    autoTable(doc, {
      startY: currentY,
      margin: { left: marginLeft, right: marginLeft },
      head: [['Otot', 'Gerakan', 'Set', 'Repetisi', 'Deskripsi']],
      body: exercises.map(e => [
        e.muscle,
        e.name,
        e.sets.toString(),
        e.reps.toString(),
        e.desc,
      ]),
      styles: {
        fontSize: 9,
        textColor: 30,
        font: 'helvetica',
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [80, 80, 80],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      theme: 'grid',
      didDrawPage: data => {
        currentY = data.cursor.y + spacingBetweenTables
      },
    })
  })

  doc.save('jadwal-latihan-regenfit.pdf')
}



  const handleImport = async e => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      await clearExercises()
      for (const item of data) await addExercise(item)
      const updated = await getExercises()
      setEx(updated)
      alert('Import berhasil!')
    } catch {
      alert('File JSON tidak valid!')
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-screen-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-black dark:text-white">
        RegenFit – Jadwal Latihan Mingguan
      </h1>

      {/* Tombol Aksi */}
<div className="flex flex-wrap justify-center gap-3 mb-6">
  {/* Tombol Tambah */}
  <button
    onClick={() => setShowModal(true)}
    className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
  >
    <span className="text-base">＋</span> Tambah
  </button>

  {/* Tombol Reset */}
  <button
    onClick={handleReset}
    className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
  >
    <span className="text-base">⟳</span> Reset
  </button>

  {/* Tombol Export PDF */}
  <button
    onClick={handleExportPDF}
    className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
  >
    <span className="text-base">📄</span> Export PDF
  </button>

  {/* Tombol Import JSON */}
  <label className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 cursor-pointer">
    <span className="text-base">📁</span> Import JSON
    <input type="file" hidden accept=".json" onChange={handleImport} />
  </label>
</div>


      {/* Tabel Jadwal */}
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Memuat data...</p>
      ) : (
        Object.keys(grouped).map(day => (
          <div key={day} className="mb-6 border rounded-lg shadow dark:border-gray-700 overflow-auto">
            <h2 className="bg-black text-white px-4 py-2 text-base font-semibold dark:bg-gray-800">{day}</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-2 text-left">Otot</th>
                  <th className="p-2 text-left">Gerakan</th>
                  <th className="p-2 text-left">Set</th>
                  <th className="p-2 text-left">Repetisi</th>
                  <th className="p-2 text-left">Penjelasan</th>
                  <th className="p-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {grouped[day].map((e, i) => (
                  <tr key={i} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-2">{e.muscle}</td>
                    <td className="p-2">{e.name}</td>
                    <td className="p-2">{e.sets}</td>
                    <td className="p-2">{e.reps}</td>
                    <td className="p-2">{e.desc}</td>
                    <td className="p-2 space-x-1">
                      <button onClick={() => handleEdit(e)} className="text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(e.id)} className="text-red-600 dark:text-red-400 hover:underline">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-full max-w-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center text-black dark:text-white">
              {editId ? 'Edit Latihan' : 'Tambah Latihan Baru'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['day', 'muscle', 'name', 'sets', 'reps', 'desc'].map(field => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="p-2 border rounded dark:bg-gray-800 dark:text-white"
                />
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">Batal</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                {editId ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}














