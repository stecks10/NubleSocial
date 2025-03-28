import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography, s } from '../../theme';
import { User, Post } from '../../types';

// Mock user data
const MOCK_USER: User = {
  id: 999,
  username: 'yourusername',
  fullName: 'Your Name',
  avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
  bio: 'Mobile developer and photography enthusiast. ✨ Love travel and good coffee.',
};

// Mock post data for grid display
const MOCK_POSTS: Post[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  userId: 999,
  imageUrl: `https://picsum.photos/500/500?random=${i}`,
  caption: '',
  createdAt: new Date().toISOString(),
  likes: Math.floor(Math.random() * 100),
  comments: [],
}));

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Feather name="menu" size={24} color={theme.colors.gray800} />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>853</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>265</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
        
        {/* User Bio */}
        <View style={styles.bioContainer}>
          <Text style={styles.fullName}>{MOCK_USER.fullName}</Text>
          <Text style={styles.username}>@{MOCK_USER.username}</Text>
          <Text style={styles.bio}>{MOCK_USER.bio}</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareProfileButton}>
            <Feather name="share-2" size={20} color={theme.colors.gray800} />
          </TouchableOpacity>
        </View>
        
        {/* Photos Grid */}
        <View style={styles.photosHeader}>
          <TouchableOpacity style={styles.photosTab}>
            <Feather name="grid" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photosTab}>
            <Feather name="bookmark" size={20} color={theme.colors.gray500} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photosTab}>
            <Feather name="tag" size={20} color={theme.colors.gray500} />
          </TouchableOpacity>
        </View>
        
        {/* Photos Grid */}
        <View style={styles.photosGrid}>
          {MOCK_POSTS.map(post => (
            <TouchableOpacity key={post.id} style={styles.photoItem}>
              <Image source={{ uri: post.imageUrl }} style={styles.photo} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...typography({ fontSize: 'lg', fontWeight: 'semiBold' }),
  },
  profileInfo: {
    flexDirection: 'row',
    padding: s.md,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: s.md,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography({ fontSize: 'lg', fontWeight: 'bold' }),
  },
  statLabel: {
    ...typography({ fontSize: 'sm' }),
    color: theme.colors.gray600,
  },
  bioContainer: {
    paddingHorizontal: s.md,
    marginBottom: s.md,
  },
  fullName: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
  },
  username: {
    ...typography({ fontSize: 'sm' }),
    color: theme.colors.gray600,
    marginBottom: s.xs,
  },
  bio: {
    ...typography({ fontSize: 'md' }),
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: s.md,
    marginBottom: s.lg,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: theme.colors.gray200,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: s.sm,
    alignItems: 'center',
    marginRight: s.sm,
  },
  editProfileText: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
  },
  shareProfileButton: {
    backgroundColor: theme.colors.gray200,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: s.sm,
    paddingHorizontal: s.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photosHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
  },
  photosTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: s.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  photo: {
    flex: 1,
  },
});