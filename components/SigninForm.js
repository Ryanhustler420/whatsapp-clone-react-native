import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, Alert } from 'react-native';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { signIn } from '../utils/actions/authActions';
import { reducer } from '../utils/reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';
import Colors from '../constants/colors';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@test.com' : '',
    password: isTestMode ? '123456' : '',
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};

const SigninForm = props => {
  const dispatch = useDispatch();

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

  const authHandler = useCallback(async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password,
      );
      setError(null);
      await dispatch(action);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, [dispatch, formState]);

  return (
    <>
      <Input 
        id="email"
        label="Email" 
        iconPack={Ionicons}
        icon="mail-outline" 
        autoCapitalize={false}
        keyboardType="email-address"  
        onInputChange={inputChangeHandler}
        initialValue={formState.inputValues.email}
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
        initialValue={formState.inputValues.password}
        errorText={formState.inputValidities["password"]}
      />
      {
        isLoading ?
        <ActivityIndicator size="small" style={{ marginTop: 20 }} color={Colors.primary} /> :
        <SubmitButton 
          title="Sign in"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      }
    </>
  )
}

export default SigninForm;