import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors';
import placeholder from "../assets/images/goonsroom.png";
import { updateSignedInUserData } from "../utils/actions/authActions";
import { launchImagePicker, uploadImageAsync } from '../utils/imagePickerHelper';
import { updateLoggedInUserData } from '../store/authSlice';

const ProfileImage = props => {
  const dispatch = useDispatch();
  const source = props.uri ? { uri: props.uri } : placeholder;

  const [image, setImage] = useState(source);

  const userId = props.userId;

  const pickImage = async () => {
    try {
      const images = await launchImagePicker();
      if (!images.length) return;

      // Upload the image
      const uploadUrl = await uploadImageAsync(images[0].uri);
      if (!uploadUrl)
      {
        throw new Error(`Could not upload`);
      }

      const newData = { profilePicture: uploadUrl };
      await updateSignedInUserData(userId, newData);
      dispatch(updateLoggedInUserData({ newData }));

      setImage({ uri: uploadUrl });
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