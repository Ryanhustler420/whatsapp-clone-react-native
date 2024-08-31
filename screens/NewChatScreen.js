import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PageContainer from "../components/PageContainer";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import CommonStyles from "../constants/commonStyles";

const NewChatScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [noResultFound, setNoResultFound] = useState();
  const [users, setUsers] = useState();

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
      {
        !isLoading && noResultFound && (
          <View style={CommonStyles.center}>
            <Ionicons 
              color={Colors.lightGrey} 
              name="airplane-outline" 
              size={55} 
              style={styles.noResultIcon}
            />
            <Text style={styles.noResultText}>No users found!</Text>
          </View>
        )
      }
      {
        !isLoading && !users && (
          <View style={CommonStyles.center}>
            <Ionicons 
              color={Colors.lightGrey} 
              name="person-outline" 
              size={55} 
              style={styles.noResultIcon}
            />
            <Text style={styles.noResultText}>Enter a name to search for user!</Text>
          </View>
        )
      }
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
  },
  noResultIcon: {
    marginBottom: 20,
  },
  noResultText: {
    color: Colors.textColor,
    fontFamily: 'regular',
    letterSpacing: .3,
  }
});

export default NewChatScreen;