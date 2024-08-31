import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, FlatList } from 'react-native'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PageContainer from "../components/PageContainer";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import CommonStyles from "../constants/commonStyles";
import { searchUsers } from '../utils/actions/userActions';
import DataItem from '../components/DataItem';

const NewChatScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [noResultFound, setNoResultFound] = useState();
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === ""){
        setUsers();
        setNoResultFound(false);
        return;
      }
      setIsLoading(true);

      const userResult = await searchUsers(searchTerm);
      setUsers(userResult);

      if (Object.keys(userResult).length === 0)
      {
        setNoResultFound(true);
      }
      else
      {
        setNoResultFound(false);
      }

      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(delaySearch);
    }
  }, [searchTerm]);

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color={Colors.lightGrey} />
        <TextInput 
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {
        isLoading && 
        <View style={CommonStyles.center}>
          <ActivityIndicator size={"large"} color={Colors.primary}  />
        </View>
      }

      {
        !isLoading && !noResultFound && users &&
        <FlatList
          data={Object.keys(users)}
          renderItem={(itemData) => {
            const userId = itemData.item;
            const userData = users[userId];

            return <DataItem 
              title={`${userData.firstName} ${userData.lastName}`}
              image={userData.profilePicture}
              subTitle={userData.about}
            />
          }}
        />
      }

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