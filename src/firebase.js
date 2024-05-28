import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDSFZg2GeI58DVZIyPkXjZm7EEGMG-ImJQ',
  authDomain: 'todoproject-ef2e8.firebaseapp.com',
  projectId: 'todoproject-ef2e8',
  storageBucket: 'todoproject-ef2e8.appspot.com',
  messagingSenderId: '75674700177',
  appId: '1:75674700177:web:86b63fae5a9a39c474b230',
  databaseURL:
    'https://todoproject-ef2e8-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
