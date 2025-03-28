import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography } from '../../../theme';
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
          <Feather name="more-vertical" size={20} color={theme.colors.gray800} />
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
            <Feather name="heart" size={22} color={theme.colors.secondary} />
            <Text style={styles.actionCount}>{post.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={22} color={theme.colors.gray700} />
            <Text style={styles.actionCount}>{post.comments.length}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="bookmark" size={22} color={theme.colors.gray700} />
            <Text style={styles.actionCount}>1</Text>
          </TouchableOpacity>
        </View>
      </View>

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
            ver {post.comments.length} comentários
          </Text>
        </TouchableOpacity>
      )}

      {/* First comment for preview */}
      {post.comments.length > 0 && (
        <View style={styles.commentPreviewContainer}>
          <Image source={{ uri: post.comments[0].user?.avatar }} style={styles.commentAvatar} />
          <View style={styles.commentContent}>
            <Text style={styles.commentUsername}>{post.comments[0].user?.username}</Text>
            <Text style={styles.commentText}>{post.comments[0].text}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
  },
  location: {
    ...typography({ fontSize: 'xs' }),
    color: theme.colors.gray600,
    marginTop: 2,
  },
  postImage: {
    width,
    height: width,
  },
  actions: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionCount: {
    ...typography({ fontSize: 'sm', fontWeight: 'medium' }),
    marginLeft: 6,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  usernameCaption: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
    marginRight: 6,
  },
  caption: {
    ...typography({ fontSize: 'md' }),
    flex: 1,
  },
  commentsButton: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  commentsText: {
    ...typography({ fontSize: 'sm' }),
    color: theme.colors.gray600,
  },
  commentPreviewContainer: {
    flexDirection: 'row', 
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  commentUsername: {
    ...typography({ fontSize: 'sm', fontWeight: 'semiBold' }),
    marginRight: 4,
  },
  commentText: {
    ...typography({ fontSize: 'sm' }),
    flex: 1,
  },
});