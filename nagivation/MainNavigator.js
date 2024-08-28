import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatSettingsScreen from '../screens/ChatSettingsScreen';

import SettingsScreen from '../screens/SettingsScreen';
import ChatListScreen from '../screens/ChatListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: ""
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

const MainNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" 
        component={TabNavigator} 
        options={{
          headerShown: false,
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
    </Stack.Navigator>   
  )
}

export default MainNavigator;