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
  bio: 'Mobile developer and photography enthusiast. ✨\nLove travel and good coffee.',
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
        <TouchableOpacity>
          <Feather name="menu" size={24} color={theme.colors.gray800} />
        </TouchableOpacity>
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
            <Feather name="share" size={20} color={theme.colors.gray800} />
          </TouchableOpacity>
        </View>
        
        {/* Photos Grid Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Feather name="grid" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Feather name="bookmark" size={20} color={theme.colors.gray500} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Feather name="heart" size={20} color={theme.colors.gray500} />
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
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
  },
  headerTitle: {
    ...typography({ fontSize: 'lg', fontWeight: 'bold' }),
  },
  profileInfo: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginRight: 24,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography({ fontSize: 'lg', fontWeight: 'bold' }),
    marginBottom: 4,
  },
  statLabel: {
    ...typography({ fontSize: 'sm' }),
    color: theme.colors.gray600,
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  fullName: {
    ...typography({ fontSize: 'md', fontWeight: 'bold' }),
  },
  username: {
    ...typography({ fontSize: 'sm' }),
    color: theme.colors.gray600,
    marginBottom: 6,
  },
  bio: {
    ...typography({ fontSize: 'md' }),
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: theme.colors.gray200,
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  editProfileText: {
    ...typography({ fontSize: 'md', fontWeight: 'medium' }),
    color: theme.colors.gray800,
  },
  shareProfileButton: {
    width: 40,
    height: 36,
    backgroundColor: theme.colors.gray200,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
    marginBottom: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
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