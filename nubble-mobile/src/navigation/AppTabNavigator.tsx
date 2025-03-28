import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { theme } from '../theme';
import { AppTabParamList } from './types';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import NewPostScreen from '../screens/newPost/NewPostScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray700,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Novo post',
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewPostTab"
        component={NewPostScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Meu perfil',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
    height: 60,
    elevation: 0,
    shadowOpacity: 0,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});