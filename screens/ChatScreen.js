import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { View, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native'; 

import Colors from "../constants/colors";
import backgroundImage from "../assets/images/whatsapp-img.jpg";

const ChatScreen = props => {
  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

      </ImageBackground>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => console.log("Select Assets")}>
          <Ionicons name="add-outline" size={24} color={Colors.blue} />
        </TouchableOpacity>
        <TextInput />
        <TouchableOpacity onPress={() => console.log("Open Camera")}>
          <Ionicons name="camera-outline" size={24} color={Colors.blue} />
        </TouchableOpacity>
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