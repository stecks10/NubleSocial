import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography, s } from '../../../theme';
import { Post } from '../../../types';

interface PostItemProps {
  post: Post;
}

const { width } = Dimensions.get('window');

export function PostItem({ post }: PostItemProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user?.avatar }} style={styles.userAvatar} />
          <View>
            <Text style={styles.username}>{post.user?.username}</Text>
            {post.location && (
              <Text style={styles.location}>{post.location}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="more-vertical" size={20} color={theme.colors.gray700} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image 
        source={{ uri: post.imageUrl }} 
        style={styles.postImage} 
        resizeMode="cover"
      />

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="heart" size={24} color={theme.colors.gray700} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={24} color={theme.colors.gray700} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="send" size={24} color={theme.colors.gray700} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Feather name="bookmark" size={24} color={theme.colors.gray700} />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{post.likes} likes</Text>

      {/* Caption */}
      {post.caption && (
        <View style={styles.captionContainer}>
          <Text style={styles.usernameCaption}>{post.user?.username}</Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
      )}

      {/* Comments */}
      {post.comments.length > 0 && (
        <TouchableOpacity style={styles.commentsButton}>
          <Text style={styles.commentsText}>
            View all {post.comments.length} comments
          </Text>
        </TouchableOpacity>
      )}

      {/* Date */}
      <Text style={styles.date}>
        {new Date(post.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: s.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s.md,
    paddingVertical: s.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: s.sm,
  },
  username: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
  },
  location: {
    ...typography({ fontSize: 'xs' }),
    color: theme.colors.gray600,
  },
  postImage: {
    width,
    height: width,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: s.md,
    paddingVertical: s.sm,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: s.md,
  },
  likes: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
    paddingHorizontal: s.md,
    marginBottom: s.xs,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: s.md,
    marginBottom: s.xs,
  },
  usernameCaption: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
    marginRight: s.xs,
  },
  caption: {
    ...typography({ fontSize: 'md' }),
    flex: 1,
  },
  commentsButton: {
    paddingHorizontal: s.md,
    marginBottom: s.xs,
  },
  commentsText: {
    ...typography({ fontSize: 'sm' }),
    color: theme.colors.gray600,
  },
  date: {
    ...typography({ fontSize: 'xs' }),
    color: theme.colors.gray500,
    paddingHorizontal: s.md,
  },
});