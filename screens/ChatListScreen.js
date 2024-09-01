import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

const ChatListScreen = props => {

  const selectedUserId = props.route?.params?.selectedUserId;
  const authData = useSelector((state) => state.auth.userData);

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
    props.navigation.navigate("ChatScreen", { users: chatUsers });

  }, [selectedUserId]);

  return (
    <View style={styles.container}>
      <Text>Chat List Screen</Text>
      <Button title="Single Chat" onPress={() => props.navigation.navigate("ChatScreen")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChatListScreen;