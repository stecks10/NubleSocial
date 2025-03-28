import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
    caption: 'Foto desses dias atrás ☀️☀️',
    location: 'Praia de Copacabana',
    createdAt: new Date().toISOString(),
    likes: 78,
    comments: [
      {
        id: 1,
        userId: 3,
        postId: 1,
        text: 'Que lugar incrível!',
        createdAt: new Date().toISOString(),
        user: {
          id: 3,
          username: 'thesummerhunter',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        }
      },
      {
        id: 2,
        userId: 4,
        postId: 1,
        text: 'Estou com inveja!',
        createdAt: new Date().toISOString(),
        user: {
          id: 4,
          username: 'amandatravel',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        }
      },
      {
        id: 3,
        userId: 5,
        postId: 1,
        text: 'Que lindo!',
        createdAt: new Date().toISOString(),
        user: {
          id: 5,
          username: 'brunoviaja',
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        }
      }
    ],
    user: {
      id: 1,
      username: 'robertoslv',
      fullName: 'Roberto Silva',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: 2,
    userId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?q=80',
    caption: 'Melancia no verão 🍉',
    location: 'Casa',
    createdAt: new Date().toISOString(),
    likes: 45,
    comments: [
      {
        id: 4,
        userId: 3,
        postId: 2,
        text: 'Delícia!',
        createdAt: new Date().toISOString(),
        user: {
          id: 3,
          username: 'thesummerhunter',
          fullName: 'Summer Hunter',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        }
      }
    ],
    user: {
      id: 2,
      username: 'thesummerhunter',
      fullName: 'Summer Hunter',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>nubble</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={22} color={theme.colors.gray800} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell" size={22} color={theme.colors.gray800} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="message-circle" size={22} color={theme.colors.gray800} />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<StoriesContainer />}
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
    height: 50,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...typography({ fontSize: 'xl', fontWeight: 'bold' }),
    color: theme.colors.black,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
});