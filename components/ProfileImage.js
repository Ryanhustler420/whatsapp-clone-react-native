import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors';
import placeholder from "../assets/images/goonsroom.png";
import { launchImagePicker } from '../utils/imagePickerHelper';

const ProfileImage = props => {
  const source = props.uri ? { uri: props.uri } : placeholder;

  const [image, setImage] = useState(source);

  const pickImage = async () => {
    try {
      const images = await launchImagePicker();
      if (!images.length) return;

      // Upload the image

      setImage({ uri: images[0].uri });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image 
        style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
        source={image} />
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