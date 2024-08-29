import React from 'react';
import Input from '../components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import PageContainer from '../components/PageContainer';
import { Text, StyleSheet, SafeAreaView } from 'react-native'; 
import SubmitButton from '../components/SubmitButton';

const AuthScreen = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <Input 
          label="First Name" 
          iconPack={Ionicons}
          icon="person-outline" 
        />
        <Input 
          label="Last Name" 
          iconPack={Ionicons}
          icon="person-outline" 
        />
        <Input 
          label="Email" 
          iconPack={Ionicons}
          icon="mail-outline" 
        />
        <Input 
          label="Password" 
          iconPack={Ionicons}
          icon="key-outline" 
        />

        <SubmitButton 
          title="Sign up"
          onPress={() => console.log("Button Pressed")}
          style={{ marginTop: 20 }}
        />

      </PageContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default AuthScreen;