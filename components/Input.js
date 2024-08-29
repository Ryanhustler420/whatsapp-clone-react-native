import { StyleSheet, View, Text, TextInput } from "react-native"
import Colors from "../constants/colors";

const Input = props => {
  return <View style={styles.container}>
    <Text style={styles.label}>{props.label}</Text>
    <View style={styles.inputContainer}>
      {props.icon && <props.iconPack style={styles.icon} name={props.icon} size={props.iconSize || 24} color="black" />}
      <TextInput 
        style={styles.input}
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: 'bold',
    marginVertical: 8,
    letterSpacing: .3,
    color: Colors.textColor,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: Colors.nearlyWhite,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: Colors.grey,
  },
  input: {
    color: Colors.textColor,
    fontFamily: 'regular',
    letterSpacing: .3,
    paddingTop: 0,
    flex: 1,
  }
});

export default Input;