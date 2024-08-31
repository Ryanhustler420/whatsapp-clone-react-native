import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PageContainer from "../components/PageContainer";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

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
    <PageContainer>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color={Colors.lightGrey} />
        <TextInput 
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={() => {}}
        />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.extraLightGrey,
    height: 30,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: 100,
  }
});

export default NewChatScreen;