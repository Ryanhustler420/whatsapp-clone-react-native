// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const getFirebaseApp = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbHsLi77-UGvz-wIGzoqxw2S_QPScSrDQ",
    authDomain: "react-native-apps-d6e45.firebaseapp.com",
    projectId: "react-native-apps-d6e45",
    storageBucket: "react-native-apps-d6e45.appspot.com",
    messagingSenderId: "366026372947",
    appId: "1:366026372947:web:970732852a5f4c169953a6"
  };

  // initialize Firebase App
  const app = initializeApp(firebaseConfig);
  // initialize Firebase Auth for that app immediately
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  return { app, auth, getApp, getAuth };
}