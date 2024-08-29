import React, { useCallback, useReducer } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { reducer } from '../utils/reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';

const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SigninForm = props => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({ inputId, validationResult: result });
  }, [dispatchFormState]);

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
      />
      <Input 
        id="password"
        label="Password" 
        iconPack={Ionicons}
        autoCapitalize={false}
        secureTextEntry={true}
        icon="key-outline" 
        onInputChange={inputChangeHandler}
      />
      <SubmitButton 
        title="Sign in"
        onPress={() => console.log("Button Pressed")}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  )
}

export default SigninForm;