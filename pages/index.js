'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-all duration-300">
      <main className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-16 gap-10">
        {/* Gambar Ilustrasi */}
        <img
          src="/fitness-illustration.svg"
          alt="Ilustrasi RegenFit"
          className="w-52 md:w-80 animate-fade-in rounded-xl shadow-xl"
        />

        {/* Konten Teks */}
        <div className="max-w-xl space-y-6 animate-fade-in text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Selamat Datang di{' '}
            <span className="text-black dark:text-white underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4">
              RegenFit
            </span>
            !
          </h2>

          <p className="text-base md:text-lg text-gray-800 dark:text-gray-200">
            RegenFit membantumu melacak aktivitas harian, progres latihan, dan
            mengikuti jadwal latihan khusus untuk kebugaran optimal.
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Konsistensi adalah kunci. Mulai hari ini dan lihat hasil luar biasa dalam beberapa minggu ke depan 💪
          </p>

          <Link
            href="/schedule"
            className="inline-block bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-md shadow-md transition-all duration-200 ease-in-out text-sm md:text-base font-medium hover:opacity-90"
          >
            Mulai Sekarang
          </Link>
        </div>
      </main>

      <footer className="text-center mt-12 mb-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} RegenFit. Dibuat oleh Afiq.
      </footer>
    </div>
  )
}
