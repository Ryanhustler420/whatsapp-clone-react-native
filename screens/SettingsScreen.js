import React from 'react';
import { StyleSheet } from 'react-native'; 
import PageTitle from '../components/PageTitle';
import PageContainer from "../components/PageContainer";

const SettingsScreen = props => {
  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings" />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default SettingsScreen;