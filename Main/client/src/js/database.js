import { openDB } from 'idb';

const initdb = async () => {
  await openDB('myTextEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text')) {
        console.log('Database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('Database created');
    },
  });
};

export const putDb = async (content) => {
  console.log('Saving data to the database');
  const db = await openDB('myTextEditor', 1);
  const tx = db.transaction('text', 'readwrite');
  const store = tx.objectStore('text');
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log('Data saved', result);
};

export const getDb = async () => {
  console.log('Fetching data from the database');
  const db = await openDB('myTextEditor', 1);
  const tx = db.transaction('text', 'readonly');
  const store = tx.objectStore('text');
  const request = store.getAll();
  const result = await request;
  console.log('Data retrieved', result);
  return result.length ? result[0].content : '';
};

initdb();
