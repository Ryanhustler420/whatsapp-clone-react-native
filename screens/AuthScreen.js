import React, { useState } from 'react';
import { Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'; 

import SignupForm from '../components/SignupForm';
import PageContainer from '../components/PageContainer';
import SigninForm from '../components/SigninForm';
import Colors from '../constants/colors';

import logo from "../assets/images/goonsroom.png";

const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
        >
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? "height" : undefined}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={logo} />
            </View>
            {isSignup ? <SignupForm /> : <SigninForm />}
            <TouchableOpacity 
              style={styles.linkContainer} 
              onPress={() => setIsSignup(!isSignup)}
            >
              <Text style={styles.link}>{`Switch to ${isSignup ? 'Sign In' : 'Sign Up'}`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
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
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  image: {
    width: '50%',
    resizeMode: 'contain',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default AuthScreen;