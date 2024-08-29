import React from 'react';
import Input from '../components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import PageContainer from '../components/PageContainer';
import { Text, StyleSheet, SafeAreaView } from 'react-native'; 

const AuthScreen = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <Input 
          label="First Name" 
          icon="person-outline" 
          iconPack={Ionicons} 
        />
      </PageContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default AuthScreen;