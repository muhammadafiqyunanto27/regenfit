import { useEffect, useState } from 'react';
import { getTodos } from '../utils/db';

export default function History() {
  const [done, setDone] = useState([]);

  useEffect(() => {
    getTodos().then((ts) => setDone(ts.filter((t) => t.done)));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Latihan Selesai</h1>
      <ul className="space-y-2">
        {done.map((d, i) => (
          <li key={i} className="p-2 border border-gray-300 rounded bg-white dark:bg-gray-800">
            <span>{new Date(d.date).toLocaleString()}</span> — <span>{d.task}</span>
          </li>
        ))}
        {done.length === 0 && <li className="text-gray-500">Belum ada riwayat latihan.</li>}
      </ul>
    </div>
  );
}
