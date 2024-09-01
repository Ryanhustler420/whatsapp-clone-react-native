import React, { useCallback, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { View, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, Text } from 'react-native'; 

import PageContainer from "../components/PageContainer";
import Colors from "../constants/colors";
import backgroundImage from "../assets/images/whatsapp-img.jpg";
import { useSelector } from 'react-redux';
import Bubble from '../components/Bubble';
import { createChat, sendTextMessage } from '../utils/actions/chatActions';

const ChatScreen = props => {
  const [chatUsers, setChatUsers] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [errorBannerText, setErrorBannerText] = useState("");
  const [chatId, setChatId] = useState(props.route?.params?.chatId);

  const storedUsers = useSelector(state => state.users.storedUsers);
  const authData = useSelector(state => state.auth.userData);
  const storedChats = useSelector((state) => state.chats.chatsData);
  const chatMessages = useSelector((state) => {
    if (!chatId) return [];
    const chatMessagesData = state.messages.messagesData[chatId];
    if (!chatMessagesData) return [];
    const messageList = [];
    for (const key in chatMessagesData)
    {
      const message = chatMessagesData[key];
      messageList.push({ ...message, key });
    }
    return messageList;
  });

  const chatData = (chatId && storedChats[chatId]) || props.route?.params?.newChatData;

  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find(uid => uid !== authData.userId);
    const otherUserData = storedUsers[otherUserId];

    return otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`;
  }

  useEffect(() => {
    props?.navigation?.setOptions({
      headerTitle: getChatTitleFromName(),
    })

    setChatUsers(chatData.users);
  }, [chatUsers]);

  const sendMessage = useCallback(async () => {
    try {
      let id = chatId;
      if (!id) {
        // No Chat Id, Create the chat
        id = await createChat(authData.userId, props.route?.params?.newChatData);
        setChatId(id);
      }
      await sendTextMessage(id, authData.userId, messageText);
      setMessageText("");
    } catch (error) {
      console.log(error);
      setErrorBannerText("Message failed to send");
      setTimeout(() => setErrorBannerText(""), 5000);
    }
  }, [messageText, chatId]);

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.screen} 
        keyboardVerticalOffset={100}
        behavior={Platform.OS == "ios" ? 'padding' : undefined} 
      >
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <PageContainer>
            {
              !chatId && <Bubble text="This is new chat, Say hi!" type="system" />
            }
            {
              errorBannerText !== "" && <Bubble text={errorBannerText} type="error" />
            }
            {
              chatId && 
              <FlatList
                data={chatMessages}
                renderItem={(itemData) => {
                  const message = itemData.item;
                  const isOwnMessage = message.sendBy === authData.userId;
                  const messageType = isOwnMessage ? "myMessage" : "theirMessage";
                  return <Bubble
                    type={messageType}
                    text={message.text}
                  />
                }}
              />
            }
          </PageContainer>
        </ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButton} onPress={() => console.log("Select Assets")}>
            <Ionicons name="add-outline" size={24} color={Colors.blue} />
          </TouchableOpacity>
          <TextInput placeholder='Type a message' style={styles.textBox} value={messageText} onChangeText={(e) => setMessageText(e)} onSubmitEditing={(e) => setMessageText(e.nativeEvent.text)} />
          { 
            messageText === "" ?
            <TouchableOpacity style={styles.mediaButton} onPress={() => console.log("Open Camera")}>
              <Ionicons name="camera-outline" size={24} color={Colors.blue} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ ...styles.mediaButton, ...styles.sendButton }} onPress={sendMessage}>
              <Ionicons name="send-outline" size={24} color={Colors.blue} />
            </TouchableOpacity>
          }
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  screen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.lightGrey,
    marginHorizontal: 8,
    padding: 10,
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sendButton: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 20,
  }
});

export default ChatScreen;