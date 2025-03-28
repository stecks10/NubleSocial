import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { theme, typography, s } from '../../theme';
import { NotificationItem } from './components/NotificationItem';

// Mock notifications
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'like',
    user: {
      id: 1,
      username: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    message: 'liked your photo',
    time: '2h',
  },
  {
    id: '2',
    type: 'comment',
    user: {
      id: 2,
      username: 'janedoe',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    message: 'commented: "Love this!"',
    time: '5h',
  },
  {
    id: '3',
    type: 'follow',
    user: {
      id: 3,
      username: 'mike',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    message: 'started following you',
    time: '1d',
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 60,
    paddingHorizontal: s.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography({ fontSize: 'lg', fontWeight: 'semiBold' }),
  },
});