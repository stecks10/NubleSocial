import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

import { theme, typography } from '../../theme';
import { Post } from '../../types';
import { PostItem } from './components/PostItem';
import { StoriesContainer } from './components/StoriesContainer';

// Mock data for now - in a real app this would come from an API
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    userId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80',
    caption: 'A beautiful day at the beach! 🌊',
    location: 'Malibu Beach',
    createdAt: new Date().toISOString(),
    likes: 24,
    comments: [],
    user: {
      id: 1,
      username: 'johndoe',
      fullName: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    id: 2,
    userId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80',
    caption: 'Best coffee in town ☕',
    location: 'Coffee Lab',
    createdAt: new Date().toISOString(),
    likes: 18,
    comments: [],
    user: {
      id: 2,
      username: 'janedoe',
      fullName: 'Jane Doe',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nubble</Text>
      </View>
      
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
        ListHeaderComponent={<StoriesContainer />}
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography({ fontSize: 'xl', fontWeight: 'bold' }),
    color: theme.colors.primary,
  },
});