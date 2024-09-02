import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import * as Clipboard from "expo-clipboard";
import Colors from '../constants/colors';
import uuid from "react-native-uuid";
import { Ionicons } from '@expo/vector-icons';
import { starMessage } from '../utils/actions/chatActions';

const MenuItem = props => {
  const Icon = props.iconPack ?? Ionicons;

  return <MenuOption onSelect={props.onSelect}>
    <View style={styles.menuItemContainer}>
      <Text style={styles.menuText}>{props.text}</Text>
      <Icon name={props.iconName} size={18} />
    </View>
  </MenuOption>
}

const Bubble = props => {
  const { text, type, messageId, chatId, userId } = props;

  const wrapperStyle = { ...styles.wrapperStyle };
  const bubbleStyle = { ...styles.textContainer };
  const textStyle = { ...styles.text };

  const menuRef = useRef(null);
  const id = useRef(uuid.v4());

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

  const copyToClipboard = async text => {
    try {
      await Clipboard.setStringAsync(text);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <View style={wrapperStyle}>
      <Container onLongPress={() => menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{ width: '100%' }}>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions>
              <MenuItem iconPack={Ionicons} iconName={"copy-outline"} text="Copy Text" onSelect={() => copyToClipboard(text)} />
              <MenuItem iconPack={Ionicons} iconName={"star-outline"} text="Star Message" onSelect={() => starMessage(messageId, chatId, userId)} />
            </MenuOptions>
          </Menu>
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
  },
  menuItemContainer: {
    flexDirection: 'row',
    padding: 5
  },
  menuText: {
    flex: 1,
    fontFamily: 'regular',
    letterSpacing: .3,
    fontSize: 16,
  }
})

export default Bubble;