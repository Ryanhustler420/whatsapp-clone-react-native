import React, { useCallback, useReducer } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { reducer } from '../utils/reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';
import { signUp } from '../utils/actions/authActions';
import { getFirebaseApp } from '../utils/firebaseHelper';

console.log(getFirebaseApp());

const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignupForm = props => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({ inputId, inputValue, validationResult: result });
  }, [dispatchFormState]);

  const authHandler = () => {
    signUp(
      formState.inputValues.firstName,
      formState.inputValues.lastName,
      formState.inputValues.email,
      formState.inputValues.password,
    );
  };

  return (
    <>
      <Input 
        id="firstName"
        label="First Name" 
        iconPack={Ionicons}
        icon="person-outline" 
        autoCapitalize={false}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities["firstName"]}
      />
      <Input 
        id="lastName"
        label="Last Name" 
        iconPack={Ionicons}
        icon="person-outline" 
        autoCapitalize={false} 
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities["lastName"]}
      />
      <Input 
        id="email"
        label="Email" 
        iconPack={Ionicons}
        icon="mail-outline" 
        autoCapitalize={false}
        keyboardType="email-address" 
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities["email"]}
      />
      <Input 
        id="password"
        label="Password" 
        iconPack={Ionicons}
        autoCapitalize={false}
        secureTextEntry={true}
        icon="key-outline" 
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities["password"]}
      />
      <SubmitButton 
        title="Sign up"
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  )
}

export default SignupForm;