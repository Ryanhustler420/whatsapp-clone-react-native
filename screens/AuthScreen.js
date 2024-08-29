import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'; 

import SignupForm from '../components/SignupForm';
import PageContainer from '../components/PageContainer';
import SigninForm from '../components/SigninForm';
import Colors from '../constants/colors';

const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        {isSignup ? <SignupForm /> : <SigninForm />}
        <TouchableOpacity 
          style={styles.linkContainer} 
          onPress={() => setIsSignup(!isSignup)}
        >
          <Text style={styles.link}>{`Switch to ${isSignup ? 'Sign In' : 'Sign Up'}`}</Text>
        </TouchableOpacity>
      </PageContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linkContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  link: {
    color: Colors.blue,
    fontFamily: 'medium',
    letterSpacing: .3,
  }
});

export default AuthScreen;