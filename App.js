import 'react-native-gesture-handler';
import { LogBox, StyleSheet} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AppNavigator from './nagivation/AppNavigator';
import { Provider } from "react-redux";
import { store } from './store/store';
import { MenuProvider } from "react-native-popup-menu";
import AsyncStorage from '@react-native-async-storage/async-storage';

// LogBox.ignoreLogs(['You are initializing Firebase Auth for React Native without providing AsyncStorage']);
// AsyncStorage.clear();

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    // https://docs.expo.dev/versions/latest/sdk/splash-screen/
    async function prepare() {
      try {
        await Font.loadAsync({
          "black": require("./assets/fonts/Roboto-Black.ttf"),
          "blackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
          "bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "boldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
          "italic": require("./assets/fonts/Roboto-Italic.ttf"),
          "light": require("./assets/fonts/Roboto-Light.ttf"),
          "lightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
          "medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "mediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
          "regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "thin": require("./assets/fonts/Roboto-Thin.ttf"),
          "thinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setTimeout(() => setAppIsLoaded(true), 1000);
      }
    }

    prepare();

  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) return null;

  return (
    <Provider store={store} >
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontFamily: "regular"
  }
});
