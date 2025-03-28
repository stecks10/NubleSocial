import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Modal, 
  Dimensions, 
  Animated, 
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography } from '../../../theme';
import { UserStory, Story } from '../../../types';

// Mock data - Agora com múltiplos stories por usuário
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
    stories: [
      {
        id: 2,
        userId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1495216875107-c6c043eb703f?q=80',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        userId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1482849297070-f4fae2173efe?q=80',
        createdAt: new Date().toISOString(),
      }
    ]
  },
  {
    user: {
      id: 3,
      username: 'pedromt',
      fullName: 'Pedro Martins',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    },
    stories: [
      {
        id: 4,
        userId: 3,
        imageUrl: 'https://images.unsplash.com/photo-1589017763578-1dc7f2adc9a0?q=80',
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        userId: 3,
        imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80',
        createdAt: new Date().toISOString(),
      },
      {
        id: 6,
        userId: 3,
        imageUrl: 'https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?q=80',
        createdAt: new Date().toISOString(),
      }
    ]
  },
  {
    user: {
      id: 4,
      username: 'carolina.c',
      fullName: 'Carolina Costa',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    stories: [{
      id: 7,
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
      id: 8,
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
      id: 9,
      userId: 6,
      imageUrl: 'https://images.unsplash.com/photo-1597347316205-1e575a4f3f0d?q=80',
      createdAt: new Date().toISOString(),
    }]
  }
];

const { width, height } = Dimensions.get('window');
const PROGRESS_BAR_WIDTH = width - 40; // 20px de margem em cada lado
const STORY_DISPLAY_TIME = 5000; // 5 segundos por story

export function StoriesContainer() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Usuário e story atual
  const currentUser = modalVisible ? MOCK_STORIES[selectedUserIndex] : null;
  const currentStory = currentUser?.stories[currentStoryIndex];
  
  // Progresso do story
  const startProgressAnimation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    progressAnim.setValue(0);
    
    progressAnimation.current = Animated.timing(progressAnim, {
      toValue: 1,
      duration: STORY_DISPLAY_TIME,
      useNativeDriver: false
    });
    
    progressAnimation.current.start(({ finished }) => {
      if (finished) {
        goToNextStory();
      }
    });
    
    // Backup para garantir que avance mesmo se a animação falhar
    timeoutRef.current = setTimeout(goToNextStory, STORY_DISPLAY_TIME + 100);
  };
  
  const resetProgress = () => {
    if (progressAnimation.current) {
      progressAnimation.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    progressAnim.setValue(0);
  };
  
  // Navegar entre stories
  const goToNextStory = () => {
    resetProgress();
    
    const userStories = MOCK_STORIES[selectedUserIndex].stories;
    
    if (currentStoryIndex < userStories.length - 1) {
      // Próximo story do mesmo usuário
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (selectedUserIndex < MOCK_STORIES.length - 1) {
      // Primeiro story do próximo usuário
      setSelectedUserIndex(selectedUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      // Último story do último usuário - fechar modal
      closeModal();
    }
  };
  
  const goToPreviousStory = () => {
    resetProgress();
    
    if (currentStoryIndex > 0) {
      // Story anterior do mesmo usuário
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (selectedUserIndex > 0) {
      // Último story do usuário anterior
      const prevUserIndex = selectedUserIndex - 1;
      const prevUserStories = MOCK_STORIES[prevUserIndex].stories;
      setSelectedUserIndex(prevUserIndex);
      setCurrentStoryIndex(prevUserStories.length - 1);
    }
  };
  
  // Abrir stories de um usuário
  const openStory = (index: number) => {
    setSelectedUserIndex(index);
    setCurrentStoryIndex(0);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    resetProgress();
    setModalVisible(false);
  };
  
  // Iniciar progresso quando o story é exibido
  useEffect(() => {
    if (modalVisible) {
      startProgressAnimation();
    }
    
    return () => {
      resetProgress();
    };
  }, [modalVisible, selectedUserIndex, currentStoryIndex]);
  
  // Renderização das barras de progresso para múltiplos stories
  const renderProgressBars = () => {
    if (!currentUser) return null;
    
    const storiesCount = currentUser.stories.length;
    const barWidth = (PROGRESS_BAR_WIDTH - (storiesCount - 1) * 4) / storiesCount;
    
    return (
      <View style={styles.progressContainer}>
        {currentUser.stories.map((_, index) => {
          const isActive = index === currentStoryIndex;
          
          return (
            <View 
              key={index} 
              style={[
                styles.progressBarBg,
                { width: barWidth }
              ]}
            >
              {isActive ? (
                <Animated.View 
                  style={[
                    styles.progressBar,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%']
                      })
                    }
                  ]}
                />
              ) : (
                <View 
                  style={[
                    styles.progressBar,
                    { width: index < currentStoryIndex ? '100%' : '0%' }
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };
  
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
        {MOCK_STORIES.slice(1).map((userStory, index) => (
          <TouchableOpacity 
            key={userStory.user.id} 
            style={styles.storyItem}
            onPress={() => openStory(index + 1)} // +1 para pular o "Seu story"
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
      
      {/* Story Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.storyModalContainer}>
          {/* Header */}
          <View style={styles.storyHeader}>
            {renderProgressBars()}
            
            <View style={styles.userInfoContainer}>
              <Image 
                source={{ uri: currentUser?.user.avatar }} 
                style={styles.storyUserAvatar} 
              />
              <Text style={styles.storyUserName}>
                {currentUser?.user.username}
              </Text>
              <Text style={styles.storyTime}>há 2h</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={closeModal}
            >
              <Feather name="x" color="white" size={24} />
            </TouchableOpacity>
          </View>
          
          {/* Story Content with Touch Areas */}
          <View style={styles.storyContent}>
            {currentStory?.imageUrl && (
              <Image 
                source={{ uri: currentStory.imageUrl }} 
                style={styles.storyImage}
                resizeMode="cover"
              />
            )}
            
            {/* Navigation Touch Areas */}
            <View style={styles.touchAreaContainer}>
              <TouchableWithoutFeedback onPress={goToPreviousStory}>
                <View style={styles.prevTouchArea} />
              </TouchableWithoutFeedback>
              
              <TouchableWithoutFeedback onPress={goToNextStory}>
                <View style={styles.nextTouchArea} />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
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
  
  // Story Modal Styles
  storyModalContainer: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  storyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  progressBarBg: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: 3,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  storyUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  storyUserName: {
    color: theme.colors.white,
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
    marginRight: 10,
  },
  storyTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    ...typography({ fontSize: 'xs' }),
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  storyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  touchAreaContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  prevTouchArea: {
    width: '30%',
    height: '100%',
  },
  nextTouchArea: {
    width: '70%',
    height: '100%',
  },
});