// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu4BTmCPoje4axE1nE4Sq-IBvOVqe8GY8",
  authDomain: "react-native-projects-4a240.firebaseapp.com",
  projectId: "react-native-projects-4a240",
  storageBucket: "react-native-projects-4a240.appspot.com",
  messagingSenderId: "92808186686",
  appId: "1:92808186686:web:082361bf2aa943d5d37a6f"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const getFirebaseApp = () => {
  return { app, auth, getApp, getAuth };
}