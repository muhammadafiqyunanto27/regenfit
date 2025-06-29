import { openDB } from 'idb';

// Konstanta Nama DB & Versi
const DB_NAME = 'fitness-db';
const DB_VERSION = 1;

// Daftar semua stores
export const STORES = {
  tracking: 'tracking',
  exercises: 'exercises',
  todos: 'todos',
  history: 'history',
};

// Inisialisasi database
export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      Object.values(STORES).forEach(store => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
        }
      });
    },
  });
}

/* === HELPER GENERIK === */

// Ambil semua data dari store
export async function getAll(store) {
  const db = await getDB();
  return db.getAll(store);
}

// Ambil data berdasarkan ID
export async function getById(store, id) {
  const db = await getDB();
  return db.get(store, id);
}

// Tambah data baru
export async function addData(store, data) {
  const db = await getDB();
  return db.add(store, data);
}

// Update data
export async function updateData(store, data) {
  const db = await getDB();
  return db.put(store, data);
}

// Hapus data berdasarkan ID
export async function deleteData(store, id) {
  const db = await getDB();
  return db.delete(store, id);
}

// Hapus semua data di store
export async function clearData(store) {
  const db = await getDB();
  return db.clear(store);
}

// Ambil semua berdasarkan field tertentu
export async function getAllByField(store, field, value) {
  const db = await getDB();
  const all = await db.getAll(store);
  return all.filter(item => item[field] === value);
}

/* === API KHUSUS TIAP FITUR === */

/* --- TRACKING --- */
export const getAllTrackingData = () => getAll(STORES.tracking);
export const addTrackingData = (data) => addData(STORES.tracking, data);
export const updateTrackingData = (data) => updateData(STORES.tracking, data);
export const deleteTrackingData = (id) => deleteData(STORES.tracking, id);
export const clearTrackingData = () => clearData(STORES.tracking);

/* --- EXERCISES --- */
export const getExercises = () => getAll(STORES.exercises);
export const addExercise = (data) => addData(STORES.exercises, data);
export const updateExercise = (data) => updateData(STORES.exercises, data);
export const deleteExercise = (id) => deleteData(STORES.exercises, id);
export const clearExercises = () => clearData(STORES.exercises);

/* --- TODOS --- */
export const getTodos = () => getAll(STORES.todos);
export const addTodo = (data) => addData(STORES.todos, data);
export const updateTodo = (data) => updateData(STORES.todos, data);
export const deleteTodo = (id) => deleteData(STORES.todos, id);
export const clearTodos = () => clearData(STORES.todos);

/* --- HISTORY --- */
export const getHistory = () => getAll(STORES.history);
export const addHistory = (data) => addData(STORES.history, data);
export const updateHistory = (data) => updateData(STORES.history, data);
export const deleteHistory = (id) => deleteData(STORES.history, id);
export const clearHistory = () => clearData(STORES.history);
