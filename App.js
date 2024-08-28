import { SafeAreaProvider  } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Rendering...");
  }, []);

  const add = () => 
  {
    setCount(count + 1);
  }

  const minus = () =>
  {
    setCount(count - 1);
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <Button title="Add" onPress={add} />
      <Text>Hello {count}</Text>
      <Button title="Minus" onPress={minus} />
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
