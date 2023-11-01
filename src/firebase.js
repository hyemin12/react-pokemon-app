// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA7RQG7uifUBnn5G8Ud8Bs9kkhY1xiQ5w",
  authDomain: "my-pokemon-app-d036d.firebaseapp.com",
  projectId: "my-pokemon-app-d036d",
  storageBucket: "my-pokemon-app-d036d.appspot.com",
  messagingSenderId: "406492370303",
  appId: "1:406492370303:web:ef75693a9ef114d50d364a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
