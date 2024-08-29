import { StyleSheet, View, Text, TextInput } from "react-native"
import Colors from "../constants/colors";

const Input = props => {
  return <View style={styles.container}>
    <Text>{props.label}</Text>
    <View style={styles.inputContainer}>
      <TextInput />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: Colors.nearlyWhite,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
  }
});

export default Input;