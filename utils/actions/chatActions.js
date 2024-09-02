import { getFirebaseApp } from "../firebaseHelper";
import { ref, push, child, getDatabase, update, get, set, remove } from "firebase/database";

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

export const sendTextMessage = async (chatId, senderId, messageText, replyTo) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase());
  const messagesRef = child(dbRef, `messages/${chatId}`);

  const messageData = {
    sendBy: senderId,
    sendAt: new Date().toISOString(),
    text: messageText
  };

  if (replyTo)
  {
    messageData.replyTo = replyTo;
  }

  await push(messagesRef, messageData);

  const chatRef = child(dbRef, `chats/${chatId}`);
  await update(chatRef, {
    updatedBy: senderId,
    latestMessageText: messageText,
    updatedAt: new Date().toISOString(),
  });
}

export const starMessage = async (messageId, chatId, userId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const childRef = await child(dbRef, `userStarredMessages/${userId}/${chatId}/${messageId}`);

    const snapshot = await get(childRef);
    if (snapshot.exists())
    {
      // Starred item exists - Unstar
      await remove(childRef);
    }
    else
    {
      // Starred item doent exist - star
      const starredMessageData = {
        chatId,
        messageId,
        starredAt: new Date().toISOString(),
      }
      await set(childRef, starredMessageData);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}