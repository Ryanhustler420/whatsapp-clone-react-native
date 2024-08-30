import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setDidTryAutoLogin } from "../store/authSlice";
import StyleSheet from "../constants/commonStyles";
import Colors from '../constants/colors';

const StartUpScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const storedAuthInfo = await AsyncStorage.getItem("userData");
      if (!storedAuthInfo) {
        dispatch(setDidTryAutoLogin())
        return;
      }

      const parsedData = JSON.parse(storedAuthInfo);
      const { token, userId, expiryDate: expiryDateString } = parsedData;

      const expiryDate = new Date(expiryDateString);
      if (expiryDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAutoLogin())
        return;
      }

    }
    tryLogin();
  }, []);

  return <View style={StyleSheet.center}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
}

export default StartUpScreen;