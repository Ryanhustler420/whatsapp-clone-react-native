import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import { reducer } from '../utils/reducers/formReducer';
import PageContainer from "../components/PageContainer";
import { validateInput } from '../utils/actions/formActions';
import Colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { updateSignedInUserData } from '../utils/actions/authActions';

const SettingsScreen = props => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.userData);

  const initialState = {
    inputValues: {
      firstName: authData.firstName || '',
      lastName: authData.lastName || '',
      email: authData.email || '',
      about: authData.about ||'',
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

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

  const saveHandler = useCallback(async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await updateSignedInUserData(authData.userId, formState.inputValues);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, formState]);

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
      {
        isLoading ?
        <ActivityIndicator size="small" style={{ marginTop: 20 }} color={Colors.primary} /> :
        <SubmitButton 
          title="Update"
          onPress={saveHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      }
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