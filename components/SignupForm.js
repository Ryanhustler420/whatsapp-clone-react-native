import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Alert } from 'react-native';

import Input from '../components/Input';
import Colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { reducer } from '../utils/reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';
import { signUp } from '../utils/actions/authActions';

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
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({ inputId, inputValue, validationResult: result });
  }, [dispatchFormState]);

  useEffect(() => {
    if (error) Alert.alert("An error occurred", error);
  }, [error]);

  const authHandler = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password,
      );
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
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
      {
        isLoading ?
        <ActivityIndicator size="small" style={{ marginTop: 20 }} color={Colors.primary} /> :
        <SubmitButton 
          title="Sign up"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      }
    </>
  )
}

export default SignupForm;