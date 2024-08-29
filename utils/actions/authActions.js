import { getFirebaseApp } from "../firebaseHelper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const signUp = async (firstName, lastName, email, password) => {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully:", result.user);
  } catch (error) {
    console.error(error);
  }
}