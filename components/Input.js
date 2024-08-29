import { StyleSheet, View, Text, TextInput } from "react-native"
import Colors from "../constants/colors";

const Input = props => {

  const onChangeText = text => {
    props.onInputChange(props.id, text);
  }

  return <View style={styles.container}>
    <Text style={styles.label}>{props.label}</Text>
    <View style={styles.inputContainer}>
      {props.icon && <props.iconPack style={styles.icon} name={props.icon} size={props.iconSize || 24} color="black" />}
      <TextInput 
        { ...props }
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
    
    {
      props.errorText &&
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{props.errorText}</Text>
      </View>
    }
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
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: .3,
  }
});

export default Input;