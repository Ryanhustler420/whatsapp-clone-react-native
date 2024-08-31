import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors';
import placeholder from "../assets/images/goonsroom.png";
import { launchImagePicker } from '../utils/imagePickerHelper';

const ProfileImage = props => {

  const pickImage = () => {
    launchImagePicker();
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image 
        style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
        source={placeholder} />
      <View style={styles.editIconContainer}>
        <Ionicons name="pencil-outline" size={15} color="black" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  editIconContainer: {
    backgroundColor: Colors.lightGrey,
    position: 'absolute',
    borderRadius: 20,
    padding: 8,
    bottom: -8,
    right: -8,
  }
});

export default ProfileImage;