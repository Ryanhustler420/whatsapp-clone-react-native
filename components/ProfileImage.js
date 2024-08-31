import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors';
import placeholder from "../assets/images/goonsroom.png";
import { updateSignedInUserData } from "../utils/actions/authActions";
import { launchImagePicker, uploadImageAsync } from '../utils/imagePickerHelper';
import { updateLoggedInUserData } from '../store/authSlice';

const ProfileImage = props => {
  const dispatch = useDispatch();
  const source = props.uri ? { uri: props.uri } : placeholder;

  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);
  const showEditButton = props.showEditButton && props.showEditButton == true;

  const userId = props.userId;

  const pickImage = async () => {
    try {
      const images = await launchImagePicker();
      if (!images.length) return;

      // Upload the image
      setIsLoading(true);
      const uploadUrl = await uploadImageAsync(images[0].uri);
      setIsLoading(false);
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
      setIsLoading(false);
    }
  }

  const Container = showEditButton ? TouchableOpacity : View;

  return (
    <Container onPress={pickImage}>
      {
        isLoading ?
        <View height={props.size} width={props.size} style={styles.loadingContainer}><ActivityIndicator size={"small"} color={Colors.primary} /></View> :
        <Image 
          style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
          source={image} />
      }
      {
        showEditButton && !isLoading &&
        <View style={styles.editIconContainer}>
          <Ionicons name="pencil-outline" size={15} color="black" />
        </View>
      }
    </Container>
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
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProfileImage;