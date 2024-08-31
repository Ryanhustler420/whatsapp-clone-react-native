import React from 'react';
import ProfileImage from "../components/ProfileImage";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../constants/colors';

const DataItem = props => {

  const { title, subTitle, profilePicture } = props;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ProfileImage size={40} uri={"https://via.placeholder.com/50x50"} />
        <View style={styles.textContainer}>
          <Text 
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>
          <Text 
            numberOfLines={1}
            style={styles.subTitle}
          >
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomColor: Colors.extraLightGrey,
    borderBottomWidth: 1,
    alignItems: 'center',
    minHeight: 50
  },
  textContainer: {
    marginLeft: 14,
  },
  title: {
    fontFamily: 'medium',
    fontSize: 16,
    letterSpacing: .3,
  },
  subTitle: {
    fontFamily: 'regular',
    color: Colors.grey,
    letterSpacing: .3,
  }
});

export default DataItem;