import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; 

const AuthScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Auth Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AuthScreen;