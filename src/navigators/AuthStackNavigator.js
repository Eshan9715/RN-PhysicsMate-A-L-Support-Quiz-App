import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {SignInScreen, SignUpScreen} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
