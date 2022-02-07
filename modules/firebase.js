import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCh5AzPccNhM7lmlCFUr74T-7_VvKgV31Y",
  authDomain: "akasadesigner-9999.firebaseapp.com",
  databaseURL:
    "https://akasadesigner-9999-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "akasadesigner-9999",
  storageBucket: "akasadesigner-9999.appspot.com",
  messagingSenderId: "807494869303",
  appId: "1:807494869303:web:ba42b2606864b09f54fab2",
  measurementId: "G-QP2TE74M5E",
};
const app = initializeApp(firebaseConfig);
const db = ref(getDatabase(app));

export { app, db };
