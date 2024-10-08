import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import { reducer } from '../utils/reducers/formReducer';
import PageContainer from "../components/PageContainer";
import { updateLoggedInUserData } from '../store/authSlice';
import { validateInput } from '../utils/actions/formActions';
import Colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { updateSignedInUserData, userLogout } from '../utils/actions/authActions';
import ProfileImage from '../components/ProfileImage';

const SettingsScreen = props => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.userData);

  const firstName = authData.firstName;
  const lastName = authData.lastName;
  const email = authData.email;
  const about = authData.about;

  const initialState = {
    inputValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      about: about,
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
      dispatch(updateLoggedInUserData({ newData: formState.inputValues }));
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;
    return (
      currentValues.firstName !== firstName ||
      currentValues.lastName !== lastName ||
      currentValues.email !== email ||
      currentValues.about !== about
    );
  }

  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings" />
      <ScrollView contentContainerStyle={styles.formContianer}>

        <ProfileImage 
          size={80} 
          userId={authData.userId} 
          showEditButton
          // uri={authData.profilePicture}
        />

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
        <View style={{ marginTop: 20 }}>
          { showSuccessMessage && <Text>Saved!</Text> }
          {
            isLoading ?
            <ActivityIndicator size="small" style={{ marginTop: 20 }} color={Colors.primary} /> :
            hasChanges() && <SubmitButton 
              title="Update"
              onPress={saveHandler}
              style={{ marginTop: 20 }}
              disabled={!formState.formIsValid}
            />
          }
        </View>
        <SubmitButton 
          title="Logout"
          color={Colors.red}
          style={{ marginTop: 20 }}
          onPress={() => dispatch(userLogout())}
        />
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContianer: {
    alignItems: 'center',
  }
});

export default SettingsScreen;