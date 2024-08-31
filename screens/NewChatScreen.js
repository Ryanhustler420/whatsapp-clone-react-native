import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const NewChatScreen = props => {

  useEffect(() => {
    props?.navigation?.setOptions({
      headerLeft: () => {
        return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
            title="Close"
            onPress={() => props?.navigation?.goBack()}
          />
        </HeaderButtons>
      },
      headerTitle: "New Chat",
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text>New Chat Screen</Text>
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

export default NewChatScreen;