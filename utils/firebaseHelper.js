// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbHsLi77-UGvz-wIGzoqxw2S_QPScSrDQ",
    authDomain: "react-native-apps-d6e45.firebaseapp.com",
    projectId: "react-native-apps-d6e45",
    storageBucket: "react-native-apps-d6e45.appspot.com",
    messagingSenderId: "366026372947",
    appId: "1:366026372947:web:970732852a5f4c169953a6"
  };
  
  // Initialize Firebase
  return initializeApp(firebaseConfig);
}