import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import * as Clipboard from "expo-clipboard";
import Colors from '../constants/colors';
import uuid from "react-native-uuid";
import { Ionicons } from '@expo/vector-icons';
import { starMessage } from '../utils/actions/chatActions';
import { useSelector } from 'react-redux';

// https://stackoverflow.com/a/25275808
function formatAmPm(dateString) {
  const date = new Date(dateString);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  // return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  return strTime;
}

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
  const { text, type, messageId, chatId, userId, date } = props;
  const starredMessages = useSelector((state) => state.messages.starredMessages[chatId] ?? {});

  const wrapperStyle = { ...styles.wrapperStyle };
  const bubbleStyle = { ...styles.textContainer };
  const textStyle = { ...styles.text };

  const menuRef = useRef(null);
  const id = useRef(uuid.v4());

  let Container = View;
  let isUserMessage = false;
  const dateString = formatAmPm(date);

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
      isUserMessage = true;
      Container = TouchableWithoutFeedback;
      wrapperStyle.justifyContent = "flex-end";
      bubbleStyle.backgroundColor = '#e7fed6';
      bubbleStyle.maxWidth = '90%';
      break;
    case "theirMessage":
      isUserMessage = true;
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

  const isStarred = isUserMessage && starredMessages[messageId] !== undefined;

  return (
    <View style={wrapperStyle}>
      <Container onLongPress={() => menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{ width: '100%' }}>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
          {
            dateString && <View style={styles.timeContainer}>
              { isStarred && <Ionicons name="star" size={14} color={Colors.textColor} style={{ marginRight: 5 }} /> }
              <Text style={styles.time}>{dateString}</Text>
            </View>
          }
          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions>
              <MenuItem iconPack={Ionicons} iconName={"copy-outline"} text="Copy Text" onSelect={() => copyToClipboard(text)} />
              <MenuItem iconPack={Ionicons} iconName={`${isStarred ? 'star' : 'star-outline'}`} text={`${isStarred ? 'Unstar' : 'Star'} Message`} onSelect={() => starMessage(messageId, chatId, userId)} />
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
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  time: {
    fontFamily: 'regular',
    letterSpacing: .3,
    color: Colors.grey,
    fontSize: 12,
  }
})

export default Bubble;