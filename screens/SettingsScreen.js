import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, StyleSheet } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import { reducer } from '../utils/reducers/formReducer';
import PageContainer from "../components/PageContainer";
import { validateInput } from '../utils/actions/formActions';

const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    about: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    about: false,
  },
  formIsValid: false,
};

const SettingsScreen = props => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.userData);

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

  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings" />
      <Input 
        id="firstName"
        label="First Name" 
        iconPack={Ionicons}
        icon="person-outline" 
        autoCapitalize={false}
        initialValue={authData.firstName}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities["firstName"]}
      />
      <Input 
        id="lastName"
        label="Last Name" 
        iconPack={Ionicons}
        icon="person-outline" 
        autoCapitalize={false} 
        initialValue={authData.lastName}
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
        initialValue={authData.email}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities["email"]}
      />
      <Input 
        id="about"
        label="About" 
        iconPack={Ionicons}
        icon="person-outline" 
        autoCapitalize={false} 
        initialValue={authData?.about}
        onInputChange={inputChangeHandler}
        errorText={formState.inputValidities["about"]}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default SettingsScreen;