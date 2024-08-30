import { child, getDatabase, set, ref } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { getFirebaseApp } from "../firebaseHelper";
import { authenticate } from "../../store/authSlice";

export const signUp = (firstName, lastName, email, password) => {
  return async dispatch => {
    const { auth } = getFirebaseApp();
  
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = result.user;
      const { accessToken } = stsTokenManager;

      const userData = await createUser(firstName, lastName, email, uid);

      dispatch(authenticate({ token: accessToken, userData }));
    } catch (error) {
      const errorCode = error.code;
      let message = "Something went wrong";
      if (errorCode === "auth/email-already-in-use") {
        message = "Email already in use";
      }
      console.log(error);
      throw new Error(message);
    }
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