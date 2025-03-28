import React from 'react';
import { View, StyleSheet } from 'react-native';
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
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray700,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewPostTab"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <View style={styles.newPostButton}>
              <Feather name="plus" size={size} color={theme.colors.white} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" size={size} color={color} />
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
  },
  newPostButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});