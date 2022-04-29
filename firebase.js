import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAWnXxL_Ra3LM7kdPYDsObJ28nFKuIR2-w',
  authDomain: 'reacthookform.firebaseapp.com',
  projectId: 'reacthookform',
  storageBucket: 'reacthookform.appspot.com',
  messagingSenderId: '91424863195',
  appId: '1:91424863195:web:f5def4ead6cf4e1a062dfe',
  measurementId: 'G-9Q6900Q90Q',
};

initializeApp(firebaseConfig);

const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
