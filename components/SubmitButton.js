import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const SubmitButton = props => {

  const enabledBgColor = props.color || Colors.primary;
  const disabledBgColor = Colors.lightGrey;
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

  return <TouchableOpacity style={{ ...styles.button, backgroundColor: bgColor }}>
    <Text style={{ color: props.disabled ? Colors.grey : 'white' }}>
      Click Me
    </Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SubmitButton;