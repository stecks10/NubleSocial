import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppStackParamList } from './types';
import { AppTabNavigator } from './AppTabNavigator';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}