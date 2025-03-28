import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography } from '../../../theme';
import { Post, Comment } from '../../../types';

interface PostItemProps {
  post: Post;
}

const { width } = Dimensions.get('window');

export function PostItem({ post: initialPost }: PostItemProps) {
  const [post, setPost] = useState(initialPost);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    const newLikeCount = isLiked ? post.likes - 1 : post.likes + 1;
    setPost({...post, likes: newLikeCount});
    setIsLiked(!isLiked);
  };
  
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now(),
      userId: 999, // Usuário atual simulado
      postId: post.id,
      text: commentText,
      createdAt: new Date().toISOString(),
      user: {
        id: 999,
        username: 'yourusername',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      },
    };
    
    const updatedComments = [...post.comments, newComment];
    setPost({...post, comments: updatedComments});
    setCommentText('');
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const likeColor = isLiked ? theme.colors.secondary : theme.colors.gray700;
  const favoriteColor = isFavorited ? theme.colors.secondary : theme.colors.gray700;
  
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

      {/* Image - Double tap to like */}
      <TouchableOpacity activeOpacity={1} onPress={handleLike}>
        <Image 
          source={{ uri: post.imageUrl }} 
          style={styles.postImage} 
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Feather 
              name={isLiked ? "heart" : "heart"} 
              size={22} 
              color={likeColor} 
              style={isLiked ? styles.likedIcon : {}}
            />
            <Text style={styles.actionCount}>{post.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={toggleComments}>
            <Feather name="message-circle" size={22} color={theme.colors.gray700} />
            <Text style={styles.actionCount}>{post.comments.length}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleFavorite}>
            <Feather 
              name="bookmark" 
              size={22} 
              color={favoriteColor}
              style={isFavorited ? styles.likedIcon : {}}
            />
            <Text style={styles.actionCount}>{isFavorited ? 1 : 0}</Text>
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
        <TouchableOpacity style={styles.commentsButton} onPress={toggleComments}>
          <Text style={styles.commentsText}>
            ver {post.comments.length} comentários
          </Text>
        </TouchableOpacity>
      )}

      {/* First comment for preview */}
      {post.comments.length > 0 && (
        <View style={styles.commentPreviewContainer}>
          <Image source={{ uri: post.comments[post.comments.length - 1].user?.avatar }} style={styles.commentAvatar} />
          <View style={styles.commentContent}>
            <Text style={styles.commentUsername}>{post.comments[post.comments.length - 1].user?.username}</Text>
            <Text style={styles.commentText}>{post.comments[post.comments.length - 1].text}</Text>
          </View>
        </View>
      )}
      
      {/* Add comment section */}
      <View style={styles.addCommentContainer}>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }} 
          style={styles.commentAvatar} 
        />
        <TextInput 
          style={styles.commentInput}
          placeholder="Adicione um comentário..."
          value={commentText}
          onChangeText={setCommentText}
          onSubmitEditing={handleAddComment}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]} 
          onPress={handleAddComment}
          disabled={!commentText.trim()}
        >
          <Feather name="send" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Comments Modal */}
      <Modal
        visible={showComments}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleComments}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comentários</Text>
              <TouchableOpacity onPress={toggleComments}>
                <Feather name="x" size={24} color={theme.colors.gray800} />
              </TouchableOpacity>
            </View>
            
            {post.comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={{ uri: comment.user?.avatar }} style={styles.commentAvatar} />
                <View style={styles.commentBubble}>
                  <Text style={styles.commentUsername}>{comment.user?.username}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              </View>
            ))}
            
            <View style={styles.modalAddComment}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }} 
                style={styles.commentAvatar} 
              />
              <TextInput 
                style={styles.commentInput}
                placeholder="Adicione um comentário..."
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity 
                style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]} 
                onPress={handleAddComment}
                disabled={!commentText.trim()}
              >
                <Feather name="send" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  likedIcon: {
    opacity: 1
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
    marginBottom: 8,
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
  addCommentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    ...typography({ fontSize: 'sm' }),
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  modalTitle: {
    ...typography({ fontSize: 'lg', fontWeight: 'bold' }),
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  commentBubble: {
    flex: 1,
    backgroundColor: theme.colors.gray100,
    padding: 10,
    borderRadius: 12,
  },
  modalAddComment: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
    alignItems: 'center',
  },
});