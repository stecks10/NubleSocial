import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography } from '../../../theme';
import { UserStory } from '../../../types';

// Mock data
const MOCK_STORIES: UserStory[] = [
  {
    user: {
      id: 1,
      username: 'seu_story',
      fullName: 'Você',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    stories: [{
      id: 1,
      userId: 1,
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80',
      createdAt: new Date().toISOString(),
    }]
  },
  {
    user: {
      id: 2,
      username: 'mariagp',
      fullName: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    stories: [{
      id: 2,
      userId: 2,
      imageUrl: 'https://images.unsplash.com/photo-1495216875107-c6c043eb703f?q=80',
      createdAt: new Date().toISOString(),
    }]
  },
  {
    user: {
      id: 3,
      username: 'pedromt',
      fullName: 'Pedro Martins',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    stories: [{
      id: 3,
      userId: 3,
      imageUrl: 'https://images.unsplash.com/photo-1589017763578-1dc7f2adc9a0?q=80',
      createdAt: new Date().toISOString(),
    }]
  },
  {
    user: {
      id: 4,
      username: 'carolina.c',
      fullName: 'Carolina Costa',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    stories: [{
      id: 4,
      userId: 4,
      imageUrl: 'https://images.unsplash.com/photo-1604091179287-3daf2899663d?q=80',
      createdAt: new Date().toISOString(),
    }]
  },
  {
    user: {
      id: 5,
      username: 'joaops',
      fullName: 'João Pereira',
      avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    },
    stories: [{
      id: 5,
      userId: 5,
      imageUrl: 'https://images.unsplash.com/photo-1624221828859-fca3e39abaf4?q=80',
      createdAt: new Date().toISOString(),
    }]
  },
  {
    user: {
      id: 6,
      username: 'analuiza',
      fullName: 'Ana Luiza',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
    },
    stories: [{
      id: 6,
      userId: 6,
      imageUrl: 'https://images.unsplash.com/photo-1597347316205-1e575a4f3f0d?q=80',
      createdAt: new Date().toISOString(),
    }]
  }
];

export function StoriesContainer() {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesScroll}
      >
        {/* Add story button */}
        <TouchableOpacity style={styles.storyItem}>
          <View style={styles.addStoryContainer}>
            <View style={styles.addIconContainer}>
              <Feather name="plus" size={18} color={theme.colors.white} />
            </View>
            <Image 
              source={{ uri: MOCK_STORIES[0].user.avatar }} 
              style={styles.storyImage} 
            />
          </View>
          <Text style={styles.storyUsername} numberOfLines={1}>
            Seu story
          </Text>
        </TouchableOpacity>
        
        {/* Other stories */}
        {MOCK_STORIES.slice(1).map((userStory) => (
          <TouchableOpacity 
            key={userStory.user.id} 
            style={styles.storyItem}
          >
            <View style={styles.storyImageContainer}>
              <Image 
                source={{ uri: userStory.user.avatar }} 
                style={styles.storyImage} 
              />
            </View>
            <Text style={styles.storyUsername} numberOfLines={1}>
              {userStory.user.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
    paddingBottom: 8,
  },
  storiesScroll: {
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 67,
  },
  storyImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  addStoryContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.white,
    zIndex: 10,
  },
  storyImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  storyUsername: {
    ...typography({ fontSize: 'xs' }),
    textAlign: 'center',
  },
});