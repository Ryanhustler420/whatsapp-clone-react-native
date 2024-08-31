import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';
import Colors from "../constants/colors";

const CustomHeaderButton = props => {
  return <HeaderButton 
    { ...props }
    iconSize={23}
    IconComponent={Ionicons}
    color={props.color ?? Colors.blue}
  />
}

export default CustomHeaderButton;