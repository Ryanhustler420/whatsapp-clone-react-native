import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { View, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native'; 

import Colors from "../constants/colors";
import backgroundImage from "../assets/images/whatsapp-img.jpg";

const ChatScreen = props => {
  const [messageText, setMessageText] = useState("");

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

      </ImageBackground>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={() => console.log("Select Assets")}>
          <Ionicons name="add-outline" size={24} color={Colors.blue} />
        </TouchableOpacity>
        <TextInput placeholder='Type a message' style={styles.textBox} value={messageText} onChangeText={(e) => setMessageText(e)} />
        { 
          messageText === "" ?
          <TouchableOpacity style={styles.mediaButton} onPress={() => console.log("Open Camera")}>
            <Ionicons name="camera-outline" size={24} color={Colors.blue} />
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.mediaButton} onPress={() => console.log("Open Camera")}>
            <Ionicons name="send-outline" size={24} color={Colors.blue} />
          </TouchableOpacity>
        }
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
  }
});

export default ChatScreen;