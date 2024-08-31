import React from 'react';
import { Image, View } from 'react-native';

import placeholder from "../assets/images/goonsroom.png";

const ProfileImage = props => {
  return (
    <View>
      <Image source={placeholder} />
    </View>
  )
}

export default ProfileImage;