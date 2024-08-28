import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, SafeAreaView } from 'react-native'; 

import backgroundImage from "../assets/images/whatsapp-img.jpg";
import { TextInput } from 'react-native-gesture-handler';

const ChatScreen = props => {
  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

      </ImageBackground>
      <View style={styles.inputContainer}>
        <Button title="Image" />
        <TextInput />
        <Button title="Camera" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
  }
});

export default ChatScreen;