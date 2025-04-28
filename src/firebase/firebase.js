import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Import getAnalytics
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID, // Access from env
};

console.log("VITE_API_KEY:", import.meta.env.VITE_API_KEY);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass app instance
const db = getFirestore(app); // Pass app instance
const analytics = getAnalytics(app); // Initialize analytics

export { app, auth, db, analytics };
