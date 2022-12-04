import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './blocks/header/__button/header__button.css';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getDatabase, set, ref } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9PqCezGSUwwFLJDnEUsX7KhpCYnCJoCA",
  authDomain: "todotest-c9a5d.firebaseapp.com",
  databaseURL: "https://todotest-c9a5d-default-rtdb.firebaseio.com",
  projectId: "todotest-c9a5d",
  storageBucket: "todotest-c9a5d.appspot.com",
  messagingSenderId: "342160797676",
  appId: "1:342160797676:web:b3914715a5d78940871ac9",
  measurementId: "G-06B7FPLPQR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);
export const storage = getStorage(app);

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firestore,
    database,
    set,
    ref,
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
