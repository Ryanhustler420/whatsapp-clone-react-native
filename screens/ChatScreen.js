import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 

const ChatScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
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

export default ChatScreen;