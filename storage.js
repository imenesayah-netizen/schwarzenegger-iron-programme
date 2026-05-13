// ============================================================
// SCHWARZENEGGER IRON PROGRAMME — Storage & State
// ============================================================

const DB_NAME = 'IronProgramme';
const DB_VERSION = 1;
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db);
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const database = e.target.result;
      if (!database.objectStoreNames.contains('workouts')) {
        database.createObjectStore('workouts', { keyPath: 'dateKey' });
      }
      if (!database.objectStoreNames.contains('bodyweight')) {
        database.createObjectStore('bodyweight', { keyPath: 'date' });
      }
      if (!database.objectStoreNames.contains('settings')) {
        database.createObjectStore('settings', { keyPath: 'key' });
      }
    };
    req.onsuccess = e => { db = e.target.result; resolve(db); };
    req.onerror = e => reject(e.target.error);
  });
}

function dateKey(date) {
  return date.toISOString().split('T')[0];
}

// ---- WORKOUT LOG ----
async function saveWorkoutLog(date, data) {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('workouts', 'readwrite');
    tx.objectStore('workouts').put({ dateKey: dateKey(date), ...data });
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}

async function loadWorkoutLog(date) {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('workouts', 'readonly');
    const req = tx.objectStore('workouts').get(dateKey(date));
    req.onsuccess = e => resolve(e.target.result || null);
    req.onerror = e => reject(e.target.error);
  });
}

async function loadAllWorkoutLogs() {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('workouts', 'readonly');
    const req = tx.objectStore('workouts').getAll();
    req.onsuccess = e => resolve(e.target.result || []);
    req.onerror = e => reject(e.target.error);
  });
}

// ---- BODY WEIGHT ----
async function saveBodyWeight(date, kg) {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('bodyweight', 'readwrite');
    tx.objectStore('bodyweight').put({ date: dateKey(date), kg });
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}

async function loadAllBodyWeights() {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('bodyweight', 'readonly');
    const req = tx.objectStore('bodyweight').getAll();
    req.onsuccess = e => resolve((e.target.result || []).sort((a,b) => a.date.localeCompare(b.date)));
    req.onerror = e => reject(e.target.error);
  });
}

// ---- SETTINGS ----
async function saveSetting(key, value) {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('settings', 'readwrite');
    tx.objectStore('settings').put({ key, value });
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}

async function loadSetting(key) {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('settings', 'readonly');
    const req = tx.objectStore('settings').get(key);
    req.onsuccess = e => resolve(e.target.result ? e.target.result.value : null);
    req.onerror = e => reject(e.target.error);
  });
}
