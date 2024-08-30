import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';

const AppNavigator = props => {
  const isAuth = useSelector((state) => state.auth.token !== null && state.auth.token !== "");

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && <AuthScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator;