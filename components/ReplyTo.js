import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const ReplyTo = props => {
  const { text, user, onCancel } = props;
  const name = `${user.firstName} ${user.lastName}`;
  return <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text numberOfLines={1} style={styles.name}>{name}</Text>
      <Text numberOfLines={1}>{text}</Text>
    </View>
    <TouchableOpacity onPress={onCancel}>
      <Ionicons name="close-circle-outline" size={24} color={Colors.blue} />
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.extraLightGrey,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftColor: Colors.blue,
    borderLeftWidth: 4,
  },
  textContainer: {
    flex: 1,
    marginRight: 5,
  },
  name: {
    color: Colors.blue,
    fontFamily: 'medium',
    letterSpacing: .3,
  }
});

export default ReplyTo;