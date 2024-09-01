import { getFirebaseApp } from "../firebaseHelper";
import { ref, push, child, getDatabase, update } from "firebase/database";

export const createChat = async (loggedInUserId, chatData) => {

  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const newChat = await push(child(dbRef, "chats"), newChatData);

    const chatUsers = newChatData.users;
    for (let i = 0; i < chatUsers.length; i++) {
      const userId = chatUsers[i];
      await push(child(dbRef, `userChats/${userId}`), newChat.key);
    }

    return newChat.key;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export const sendTextMessage = async (chatId, senderId, messageText) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase());
  const messagesRef = child(dbRef, `messages/${chatId}`);

  const messageData = {
    sendBy: senderId,
    sendAt: new Date().toISOString(),
    text: messageText
  };

  await push(messagesRef, messageData);

  const chatRef = child(dbRef, `chats/${chatId}`);
  await update(chatRef, {
    updatedBy: senderId,
    latestMessageText: messageText,
    updatedAt: new Date().toISOString(),
  });
}