import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

const ChatListScreen = props => {

  const selectedUserId = props.route?.params?.selectedUserId;
  const authData = useSelector((state) => state.auth.userData);
  const userChats = useSelector((state) => {
    const chatsData = state.chats.chatsData;
    return Object.values(chatsData);
  });

  console.log(userChats);

  useEffect(() => {
    props?.navigation?.setOptions({
      headerRight: () => {
        return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
            title="New Chat"
            onPress={() => props?.navigation?.navigate("NewChat")}
            iconName="create-outline"
          />
        </HeaderButtons>
      }
    })
  }, []);

  useEffect(() => {
    if (!selectedUserId)
    {
      return;
    }

    const chatUsers = [selectedUserId, authData.userId];

    const navigationProps = {
      newChatData: { users: chatUsers }
    };

    props.navigation.navigate("ChatScreen", navigationProps);

  }, [props.route?.params]);

  return <FlatList
    data={userChats}
    renderItem={(itemData) => {
      const chatData = itemData.item;
      const otherUserId = chatData.users.find(uid => uid != authData.userId);
      return <Text>{otherUserId}</Text>
    }}
  />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChatListScreen;