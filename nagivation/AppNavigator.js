import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from '@expo/vector-icons/Ionicons';

import SettingsScreen from '../screens/SettingsScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';

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

const AppNavigator = props => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  )
}

export default AppNavigator;