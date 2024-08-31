import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ChatListScreen = props => {

  useEffect(() => {
    props?.navigation?.setOptions({
      headerRight: () => {
        return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
            title="New Chat"
            onPress={() => {}}
            iconName="create-outline"
          />
        </HeaderButtons>
      }
    })
  }, []);

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