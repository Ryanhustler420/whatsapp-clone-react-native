import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

const SignupForm = props => {

  const inputChangeHandler = (inputId, inputValue) => {
    console.log(inputId, inputValue);
  }

  return (
    <>
      <Input 
        id="firstname"
        label="First Name" 
        iconPack={Ionicons}
        icon="person-outline" 
        onInputChange={inputChangeHandler}
      />
      <Input 
        id="lastname"
        label="Last Name" 
        iconPack={Ionicons}
        icon="person-outline" 
        onInputChange={inputChangeHandler}
      />
      <Input 
        id="email"
        label="Email" 
        iconPack={Ionicons}
        icon="mail-outline" 
        onInputChange={inputChangeHandler}
      />
      <Input 
        id="password"
        label="Password" 
        iconPack={Ionicons}
        icon="key-outline" 
        onInputChange={inputChangeHandler}
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