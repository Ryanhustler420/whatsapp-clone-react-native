import { getFirebaseApp } from "../firebaseHelper";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUp = async (firstName, lastName, email, password) => {
  const { auth } = getFirebaseApp();

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully:", result.user);
  } catch (error) {
    const errorCode = error.code;
    let message = "Something went wrong";
    if (errorCode === "auth/email-already-in-use") {
      message = "Email already in use";
    }
    throw new Error(message);
  }
}