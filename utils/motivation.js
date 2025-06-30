// utils/motivation.js

const motivasi = {
  'Kurus (Underweight)': [
    "Ayo tingkatkan asupan gizi dan rutin olahraga untuk membentuk massa otot 💪",
    "Tubuhmu butuh bahan bakar yang cukup. Jangan lupakan nutrisi seimbang 🍽️",
    "Bangun kekuatan dari sekarang. Konsistensi akan mengubah segalanya 🚀",
  ],
  'Normal': [
    "Kamu berada di jalur yang tepat. Pertahankan pola hidup sehatmu 👍",
    "Tubuh ideal bukan hanya angka, tapi kebiasaan baik yang konsisten 🌱",
    "Terus bergerak, terus berkembang. Kamu sedang jadi versi terbaikmu! 🔥",
  ],
  'Overweight': [
    "Waktunya mengurangi asupan gula dan memperbanyak aktivitas fisik 🏃‍♂️",
    "Setiap langkah kecil akan membawa hasil besar. Tetap semangat! 💯",
    "Lakukan perubahan kecil hari ini, hasil besar akan menyusul besok 💥",
  ],
  'Obesitas': [
    "Mulailah dengan berjalan ringan tiap hari, lalu tambah intensitasnya 🌄",
    "Pola makan sehat dan tidur cukup sangat penting untuk perubahanmu 🥗🛏️",
    "Jangan menyerah. Kamu sudah memulai, tinggal teruskan sampai sukses 💪",
  ],
}

export function getMotivasiByCategory(category) {
  const list = motivasi[category]
  if (!list || list.length === 0) return "Tetap semangat dan jaga gaya hidup sehat!"
  return list[Math.floor(Math.random() * list.length)] // ambil acak
}
