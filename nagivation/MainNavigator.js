import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatSettingsScreen from '../screens/ChatSettingsScreen';

import SettingsScreen from '../screens/SettingsScreen';
import ChatListScreen from '../screens/ChatListScreen';
import NewChatScreen from '../screens/NewChatScreen';
import ChatScreen from '../screens/ChatScreen';
import { useSelector } from 'react-redux';
import { getFirebaseApp } from '../utils/firebaseHelper';
import { child, getDatabase, off, onValue, ref } from 'firebase/database';

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
        <Stack.Screen name="Home" 
          component={TabNavigator} 
          options={{
            headerShown: false,
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
  const authData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.users.storedUsers);

  useEffect(() => {
    console.log("Subscribing to firebase listeners");

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
          console.log(chatSnapshot.val());
        });
      }
    });

    refs.push(userChatRef);

    return () => {
      refs.forEach(e => off(e));
    }
  }, []);

  return (
      <StackNavigator />
  )
}

export default MainNavigator;