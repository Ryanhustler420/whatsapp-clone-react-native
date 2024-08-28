import { SafeAreaProvider  } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    // Load fonts
    setTimeout(() => {
      setAppIsLoaded(true);
    }, 1000);
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) return null;

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
      <Text>Hello, World</Text>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
