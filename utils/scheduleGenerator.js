export function generateScheduleByBMI(category) {
  switch (category) {
    case 'Kurus (Underweight)':
      return [
        { day: 'Senin', focus: 'Strength ringan', duration: 60 },
        { day: 'Selasa', focus: 'Yoga & Mobility', duration: 45 },
        { day: 'Rabu', focus: 'Latihan berat badan', duration: 60 },
        { day: 'Kamis', focus: 'Stretching aktif', duration: 30 },
        { day: 'Jumat', focus: 'Dumbbell ringan', duration: 60 },
        { day: 'Sabtu', focus: 'HIIT low impact', duration: 40 },
      ]
    case 'Overweight':
    case 'Obesitas':
      return [
        { day: 'Senin', focus: 'Kardio + Jalan Kaki', duration: 60 },
        { day: 'Selasa', focus: 'Latihan Dumbbell Full Body', duration: 60 },
        { day: 'Rabu', focus: 'Stretching & Core', duration: 45 },
        { day: 'Kamis', focus: 'Kardio Intervals', duration: 60 },
        { day: 'Jumat', focus: 'Full Body Dumbbell', duration: 60 },
        { day: 'Sabtu', focus: 'Yoga & Recovery', duration: 40 },
      ]
    default:
      return [
        { day: 'Senin', focus: 'Push Workout', duration: 60 },
        { day: 'Selasa', focus: 'Pull Workout', duration: 60 },
        { day: 'Rabu', focus: 'Leg Day', duration: 60 },
        { day: 'Kamis', focus: 'Mobility + Core', duration: 45 },
        { day: 'Jumat', focus: 'Full Body Mix', duration: 60 },
        { day: 'Sabtu', focus: 'Cardio ringan + stretch', duration: 30 },
      ]
  }
}
