import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import StyleSheet from "../constants/commonStyles";
import Colors from '../constants/colors';

const StartUpScreen = props => {
  return <View style={StyleSheet.center}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
}

export default StartUpScreen;