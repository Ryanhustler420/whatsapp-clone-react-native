import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Colors from '../constants/colors';
import placeholder from "../assets/images/goonsroom.png";

const ProfileImage = props => {
  return (
    <View>
      <Image 
        style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
        source={placeholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: Colors.grey,
    borderWidth: 1,
  }
});

export default ProfileImage;