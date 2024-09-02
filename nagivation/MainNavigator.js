import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatSettingsScreen from '../screens/ChatSettingsScreen';

import SettingsScreen from '../screens/SettingsScreen';
import ChatListScreen from '../screens/ChatListScreen';
import NewChatScreen from '../screens/NewChatScreen';
import ChatScreen from '../screens/ChatScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getFirebaseApp } from '../utils/firebaseHelper';
import { child, get, getDatabase, off, onValue, ref } from 'firebase/database';
import { setChatsData } from "../store/chatSlice";
import { ActivityIndicator, View } from 'react-native';
import Colors from '../constants/colors';
import CommonStyles from '../constants/commonStyles';
import { setStoredUsers } from '../store/userSlice';
import { setChatMessages, setStarredMessages } from '../store/messagesSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen name="ChatList" 
        component={ChatListScreen} 
        options={{ 
          tabBarLabel: "Chats",
          tabBarIcon: (props) => <Ionicons name="chatbubble-outline" size={props.size} color={props.color} />,
        }}
      />
      <Tab.Screen name="Settings" 
        component={SettingsScreen} 
        options={{ 
          tabBarLabel: 'Settings',
          tabBarIcon: (props) => <Ionicons name="settings-outline" size={props.size} color={props.color} />,
        }} 
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Chats" 
          component={TabNavigator} 
          options={{
            headerShown: false, // make this true to see bg color
            headerStyle: {
              backgroundColor: '#fff', // Home screen header color
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen name="ChatScreen" 
          component={ChatScreen} 
          options={{
            // gestureEnabled: false
            // headerShadowVisible: true,
            headerTitle: "",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen name="ChatSettings" 
          component={ChatSettingsScreen} 
          options={{
            // gestureEnabled: false
            // headerBackTitle: "Go Back"
            // headerShadowVisible: true,
            headerTitle: "Chat Settings",
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="NewChat" 
          component={NewChatScreen} 
        />
      </Stack.Group>
    </Stack.Navigator> 
  )
}

const MainNavigator = props => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const authData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.users.storedUsers);

  useEffect(() => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const userChatRef = child(dbRef, `userChats/${authData.userId}`);
    const refs = [];

    onValue(userChatRef, (querySnapshot) => {
      const chatIdsData = querySnapshot.val() || {};
      const chatIds = Object.values(chatIdsData);

      const chatsData = {};
      let chatFoundCount = 0;

      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i];
        const chatRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatRef);

        onValue(chatRef, (chatSnapshot) => {
          chatFoundCount++;
          
          const data = chatSnapshot.val();
          if (data)
          {
            data.key = chatSnapshot.key;

            data.users.forEach(userId => {
              if (storedUsers[userId]) return;

              const userRef = child(dbRef, `users/${userId}`);

              get(userRef).then(userSnapshot => {
                const userSnapshotData = userSnapshot.val();
                dispatch(setStoredUsers({ newUsers: { userSnapshotData } }));
              });

              refs.push(userRef);
            });

            chatsData[data.key] = data;
          }

          if (chatFoundCount >= chatIds.length)
          {
            dispatch(setChatsData({ chatsData }));
            setIsLoading(false);
          }

        });

        const messagesRef = child(dbRef, `messages/${chatId}`);
        refs.push(messagesRef);

        onValue(messagesRef, messagesSnapshot => {
          const messagesData = messagesSnapshot.val();
          dispatch(setChatMessages({ chatId, messagesData }));
        });

        if (chatFoundCount == 0)
        {
          setIsLoading(false);
        }
      }
    });

    const userStarredMessagesRef = child(dbRef, `userStarredMessages/${authData.userId}`);
    refs.push(userStarredMessagesRef);
    onValue(userStarredMessagesRef, querySnapshot => {
      const starredMessages = querySnapshot.val() ?? {};
      dispatch(setStarredMessages({ starredMessages }));
    });

    refs.push(userChatRef);

    return () => {
      refs.forEach(e => off(e));
    }
  }, []);

  if (isLoading)
  {
    return (
      <View style={CommonStyles.center}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    )
  }

  return (
      <StackNavigator />
  )
}

export default MainNavigator;