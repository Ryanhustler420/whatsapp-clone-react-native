import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; 

const ChatListScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Chat List Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChatListScreen;