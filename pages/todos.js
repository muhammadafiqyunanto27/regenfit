import { useEffect, useState } from 'react';
import { getTodos, addTodo, getExercises } from '../utils/db';

export default function Todos() {
  const [todayTodos, setToday] = useState([]);
  const todayName = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

  useEffect(() => {
    (async () => {
      const ex = await getExercises();
      const todos = await getTodos();
      const todayEx = ex.filter((e) => e.day === todayName);
      for (let e of todayEx) {
        const id = `${todayName}_${e.name}`;
        if (!todos.find((t) => t.id === id)) {
          await addTodo({ id, task: e.name, day: todayName, done: false, date: new Date().toISOString() });
        }
      }
      const freshTodos = (await getTodos()).filter((t) => t.day === todayName && !t.done);
      setToday(freshTodos);
    })();
  }, []);

  const markDone = async (item) => {
    item.done = true;
    item.date = new Date().toISOString();
    await addTodo(item);
    setToday((await getTodos()).filter((t) => t.day === todayName && !t.done));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">To-Do Latihan Hari ini ({todayName})</h1>
      <ul className="space-y-2">
        {todayTodos.map((t, i) => (
          <li key={i} className="flex justify-between p-2 border border-gray-300 rounded bg-white dark:bg-gray-800">
            <span>{t.task}</span>
            <button onClick={() => markDone(t)} className="text-green-600">✔️</button>
          </li>
        ))}
        {todayTodos.length === 0 && <li className="text-gray-500">Semua tugas selesai 🎉</li>}
      </ul>
    </div>
  );
}
