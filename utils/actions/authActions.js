import { child, getDatabase, set, ref } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { getFirebaseApp } from "../firebaseHelper";

export const signUp = async (firstName, lastName, email, password) => {
  const { auth } = getFirebaseApp();

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = result.user;
    await createUser(firstName, lastName, email, uid);
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

const createUser = async (firstName, lastName, email, userId) => {
  const name = `${firstName} ${lastName}`.toLowerCase();
  const userData = {
    firstName,
    lastName,
    name,
    userId,
    email,
    signUpDate: new Date().toISOString(),
  };

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await set(childRef, userData);
  return userData;
}