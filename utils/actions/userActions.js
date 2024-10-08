import { child, getDatabase, ref, get, query, orderByChild, startAt, endAt } from "firebase/database"
import { getFirebaseApp } from "../firebaseHelper";

export const getUserData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const userRef = child(dbRef, `users/${userId}`);

    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.error(error);
  }
}

export const searchUsers = async (queryText) => {
  const searchTerm = queryText.toLowerCase();

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const userRef = child(dbRef, "users");

    const queryRef = query(userRef, orderByChild("name"), startAt(searchTerm), endAt(searchTerm + "\uf8ff"));
    const snapshot = await get(queryRef);
    if (snapshot.exists()) 
    {
      return snapshot.val();
    }
    return {};
  } catch (error) {
    console.error(error);
    throw error;
  }
}