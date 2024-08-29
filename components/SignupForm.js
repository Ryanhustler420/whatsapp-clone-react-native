import React, { useCallback, useReducer } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { reducer } from '../utils/reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';
import { signUp } from '../utils/actions/authActions';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbHsLi77-UGvz-wIGzoqxw2S_QPScSrDQ",
  authDomain: "react-native-apps-d6e45.firebaseapp.com",
  projectId: "react-native-apps-d6e45",
  storageBucket: "react-native-apps-d6e45.appspot.com",
  messagingSenderId: "366026372947",
  appId: "1:366026372947:web:970732852a5f4c169953a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

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