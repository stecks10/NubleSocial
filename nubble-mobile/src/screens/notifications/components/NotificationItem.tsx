import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography, s } from '../../../theme';

interface NotificationItemProps {
  notification: {
    id: string;
    type: 'like' | 'comment' | 'follow';
    user: {
      id: number;
      username: string;
      avatar: string;
    };
    message: string;
    time: string;
  };
}

export function NotificationItem({ notification }: NotificationItemProps) {
  // Choose icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Feather name="heart" size={16} color={theme.colors.secondary} />;
      case 'comment':
        return <Feather name="message-circle" size={16} color={theme.colors.primary} />;
      case 'follow':
        return <Feather name="user-plus" size={16} color={theme.colors.success} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      
      <Image source={{ uri: notification.user.avatar }} style={styles.avatar} />
      
      <View style={styles.textContainer}>
        <Text style={styles.message}>
          <Text style={styles.username}>{notification.user.username}</Text>{' '}
          {notification.message}
        </Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: s.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: s.sm,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    ...typography({ fontSize: 'md' }),
  },
  username: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
  },
  time: {
    ...typography({ fontSize: 'sm' }),
    color: theme.colors.gray600,
    marginTop: s.xs,
  },
});