import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { validateString } from '../utils/validationConstraints';

const SignupForm = props => {

  const inputChangeHandler = (inputId, inputValue) => {
    switch(inputId) {
      case "firstName":
      case "lastName":
        console.log(validateString(inputId, inputValue));
        break;
      case "email":
        break;
      case "password":
        break;
    }
  }

  return (
    <>
      <Input 
        id="firstName"
        label="First Name" 
        iconPack={Ionicons}
        icon="person-outline" 
        onInputChange={inputChangeHandler}
      />
      <Input 
        id="lastName"
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