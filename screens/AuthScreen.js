import React from 'react';
import PageContainer from '../components/PageContainer';
import { Text, StyleSheet, SafeAreaView } from 'react-native'; 

const AuthScreen = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <Text>Auth Screen</Text>
      </PageContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default AuthScreen;