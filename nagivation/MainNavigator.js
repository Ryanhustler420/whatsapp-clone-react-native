import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
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
import { ActivityIndicator, Platform, View } from 'react-native';
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

  const [expoPushToken, setExpoPushToken] = useState('');
  console.log(expoPushToken);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // Handle received notification
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification tapped:");
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}