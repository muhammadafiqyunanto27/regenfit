'use client'

export default function Home() {
  const user = { name: 'teman' } // Dummy user untuk pengganti session

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-all duration-300">
      <main className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-16 gap-10">
        <img src="/fitness-illustration.svg" alt="Ilustrasi RegenFit" className="w-52 md:w-80 rounded-xl shadow-xl" />

        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Selamat Datang,{' '}
            <span className="text-black dark:text-white underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4">
              {user.name}
            </span>
            !
          </h2>

          <p className="text-base md:text-lg text-gray-800 dark:text-gray-200">
            RegenFit membantumu melacak aktivitas harian, progres latihan, dan
            mengikuti jadwal latihan khusus untuk kebugaran optimal.
          </p>
        </div>
      </main>

      <footer className="text-center mt-12 mb-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} RegenFit. Dibuat oleh Afiq.
      </footer>
    </div>
  )
}
