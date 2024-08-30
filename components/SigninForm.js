import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { signIn } from '../utils/actions/authActions';
import { reducer } from '../utils/reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';

const initialState = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
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
      await dispatch(action);
      setError(null);
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
        title="Sign in"
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  )
}

export default SigninForm;