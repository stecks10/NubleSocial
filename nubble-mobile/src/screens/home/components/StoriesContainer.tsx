import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { theme, typography, s } from '../../../theme';
import { UserStory, User } from '../../../types';
import { StoryItem } from './StoryItem';

// Mock data for stories
const MOCK_STORIES: UserStory[] = [
  {
    user: {
      id: 1,
      username: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    stories: [
      {
        id: 1,
        userId: 1,
        imageUrl: 'https://picsum.photos/id/1/500/500',
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    user: {
      id: 2,
      username: 'janedoe',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    stories: [
      {
        id: 2,
        userId: 2,
        imageUrl: 'https://picsum.photos/id/2/500/500',
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    user: {
      id: 3,
      username: 'mike',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    stories: [
      {
        id: 3,
        userId: 3,
        imageUrl: 'https://picsum.photos/id/3/500/500',
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    user: {
      id: 4,
      username: 'sarah',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    stories: [
      {
        id: 4,
        userId: 4,
        imageUrl: 'https://picsum.photos/id/4/500/500',
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

// Current user for "Your Story" item
const CURRENT_USER: User = {
  id: 999,
  username: 'you',
  avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
};

export function StoriesContainer() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Your Story */}
        <StoryItem isCurrentUser user={CURRENT_USER} />
        
        {/* Other Stories */}
        {MOCK_STORIES.map((userStory) => (
          <StoryItem 
            key={userStory.user.id} 
            userStory={userStory} 
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: s.md,
  },
  scrollContainer: {
    paddingHorizontal: s.md,
    paddingVertical: s.sm,
  },
});