import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

const SignupForm = props => {
  return (
    <>
      <Input 
        label="First Name" 
        iconPack={Ionicons}
        icon="person-outline" 
      />
      <Input 
        label="Last Name" 
        iconPack={Ionicons}
        icon="person-outline" 
      />
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
        title="Sign up"
        onPress={() => console.log("Button Pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  )
}

export default SignupForm;