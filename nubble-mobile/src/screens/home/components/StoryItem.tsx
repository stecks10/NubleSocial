import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography, s } from '../../../theme';
import { UserStory, User } from '../../../types';

interface StoryItemProps {
  userStory?: UserStory;
  user?: User;
  isCurrentUser?: boolean;
}

export function StoryItem({ userStory, user, isCurrentUser = false }: StoryItemProps) {
  // Determine which user to show
  const displayUser = userStory?.user || user;
  
  if (!displayUser) return null;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.avatarContainer, isCurrentUser ? styles.currentUserRing : styles.ringGradient]}>
        <Image 
          source={{ uri: displayUser.avatar }} 
          style={styles.avatar} 
        />
        {isCurrentUser && (
          <View style={styles.addButton}>
            <Feather name="plus" size={18} color={theme.colors.white} />
          </View>
        )}
      </View>
      <Text style={styles.username}>
        {isCurrentUser ? 'Your Story' : displayUser.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: s.xs,
    width: 72,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s.xs,
  },
  ringGradient: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  currentUserRing: {
    borderWidth: 2,
    borderColor: theme.colors.gray300,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  username: {
    ...typography({ fontSize: 'xs' }),
    textAlign: 'center',
  },
});