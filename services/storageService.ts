import { SavedSong } from '../types';

const DB_NAME = 'SingLingoDB';
const STORE_NAME = 'songs';
const DB_VERSION = 1;

// Global flag to track if storage is permanently broken in this session
let isStorageBroken = false;

// Helper to quickly fail if known broken
const checkStorageStatus = () => {
  if (isStorageBroken) {
    return Promise.reject(new Error("Storage is known to be broken (Safe Mode)"));
  }
  return Promise.resolve();
};

const openDB = (): Promise<IDBDatabase> => {
  if (isStorageBroken) return Promise.reject(new Error("Storage broken"));

  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        try {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        } catch (e) {
          console.error("Error during DB upgrade:", e);
          isStorageBroken = true;
          reject(e);
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        const error = (event.target as IDBOpenDBRequest).error;
        
        // Suppress console.error for known fatal errors to avoid user anxiety
        // We already handle these by switching to Safe Mode
        const isFatal = error && (error.name === 'UnknownError' || error.name === 'QuotaExceededError' || error.name === 'InvalidStateError');
        
        if (isFatal) {
           console.warn(`IndexedDB encountered a fatal error (${error.name}). Switching to Safe Mode.`);
           isStorageBroken = true;
        } else {
           console.error("IndexedDB Open Error:", error);
        }
        reject(error);
      };
    } catch (e) {
      console.warn("IndexedDB Exception (switching to Safe Mode):", e);
      isStorageBroken = true;
      reject(e);
    }
  });
};

export const saveSongToLibrary = async (song: SavedSong): Promise<void> => {
  if (isStorageBroken) return Promise.resolve(); // Fail silently/gracefully in safe mode

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(song); // put updates if exists, adds if not

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        } catch (e) {
            reject(e);
        }
    });
  } catch (e) {
    // If openDB failed, we just return resolve (pretend success) or reject?
    // Let's reject so the UI knows, BUT if it's broken mode, we already returned resolve above.
    console.warn("Save failed due to DB error:", e);
    return Promise.resolve(); // Treat as "saved to memory" effectively (since UI state updates separately)
  }
};

export const getAllSongs = async (): Promise<SavedSong[]> => {
  if (isStorageBroken) return [];

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
            // Sort by newest first
            const results = request.result as SavedSong[];
            resolve(results.sort((a, b) => b.createdAt - a.createdAt));
            };
            request.onerror = () => reject(request.error);
        } catch (e) {
            reject(e);
        }
    });
  } catch (e) {
    console.warn("Get all songs failed:", e);
    return [];
  }
};

export const deleteSongFromLibrary = async (id: string): Promise<void> => {
  if (isStorageBroken) return Promise.resolve();

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        } catch (e) {
            reject(e);
        }
    });
  } catch (e) {
      console.warn("Delete failed:", e);
      return Promise.resolve();
  }
};
