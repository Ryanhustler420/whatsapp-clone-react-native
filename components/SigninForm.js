import React from 'react';
import Input from '../components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import SubmitButton from '../components/SubmitButton';

const SigninForm = props => {
  return (
    <>
      <Input 
        label="Email" 
        iconPack={Ionicons}
        icon="mail-outline" 
      />
      <Input 
        label="Password" 
        iconPack={Ionicons}
        icon="key-outline" 
      />
      <SubmitButton 
        title="Sign in"
        onPress={() => console.log("Button Pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  )
}

export default SigninForm;