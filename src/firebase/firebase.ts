import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDwSfPwwfLBr52cuSSJMT9SZpNQrYdbKGw',
  authDomain: 'rest-client-293ec.firebaseapp.com',
  projectId: 'rest-client-293ec',
  storageBucket: 'rest-client-293ec.firebasestorage.app',
  messagingSenderId: '1074455418963',
  appId: '1:1074455418963:web:063715d565f45cd9bd8ea6',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
