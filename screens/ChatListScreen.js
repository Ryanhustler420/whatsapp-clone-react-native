import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import DataItem from '../components/DataItem';
import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';

const ChatListScreen = props => {

  const selectedUserId = props.route?.params?.selectedUserId;
  const storedUsers = useSelector(state => state.users.storedUsers);
  const authData = useSelector((state) => state.auth.userData);
  const userChats = useSelector((state) => {
    const chatsData = state.chats.chatsData;
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  });

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

  return <PageContainer style={{ backgroundColor: 'white' }}>
    <PageTitle text="Chats" />
    <FlatList
      data={userChats}
      renderItem={(itemData) => {
        const chatData = itemData.item;
        const otherUserId = chatData.users.find(uid => uid != authData.userId);
        const otherUser = storedUsers[otherUserId];

        if (!otherUser) return;

        const title = `${otherUser.firstName} ${otherUser.lastName}`;
        const subTitle = "This will be a message...";
        // const image = otherUser.profilePicture;

        return <DataItem 
          title={title}
          subTitle={subTitle}
          // image={image}
        />
      }}
    />
  </PageContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChatListScreen;