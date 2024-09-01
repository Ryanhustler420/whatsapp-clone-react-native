import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../constants/colors';

const Bubble = props => {
  const { text, type } = props;

  const wrapperStyle = { ...styles.wrapperStyle };
  const bubbleStyle = { ...styles.textContainer };
  const textStyle = { ...styles.text };

  let Container = View;

  switch (type)
  {
    case "system":
      textStyle.color = '#656448';
      bubbleStyle.backgroundColor = Colors.beige;
      bubbleStyle.alignItem = 'center';
      bubbleStyle.marginTop = 10;
      break;
    case "error":
      textStyle.color = 'white';
      bubbleStyle.backgroundColor = Colors.red;
      bubbleStyle.alignItem = 'center';
      bubbleStyle.marginTop = 10;
      break;
    case "myMessage":
      Container = TouchableWithoutFeedback;
      wrapperStyle.justifyContent = "flex-end";
      bubbleStyle.backgroundColor = '#e7fed6';
      bubbleStyle.maxWidth = '90%';
      break;
    case "theirMessage":
      Container = TouchableWithoutFeedback;
      wrapperStyle.justifyContent = "flex-start";
      bubbleStyle.maxWidth = '90%';
      break;
    default:
      break;
  }

  return (
    <View style={wrapperStyle}>
      <Container onLongPress={() => console.log("Long Pressed")} style={{ width: '100%' }}>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
    borderColor: "#E2DACC",
    borderWidth: 1
  },
  text: {
    fontFamily: 'regular',
    letterSpacing: .3,
  }
})

export default Bubble;