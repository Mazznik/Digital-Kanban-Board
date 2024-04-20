import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDqO3NLgaDDPe02YjoXlMeeTn-n_x6dDn4",
    authDomain: "digitalna-kanban-ploca.firebaseapp.com",
    projectId: "digitalna-kanban-ploca",
    storageBucket: "digitalna-kanban-ploca.appspot.com",
    messagingSenderId: "976602619463",
    appId: "1:976602619463:web:e42923917b5b5b56109b62"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app)

export { app, auth, db };
