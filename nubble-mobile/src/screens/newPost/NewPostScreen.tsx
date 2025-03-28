import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography, s } from '../../theme';

export default function NewPostScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Post</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.cameraPlaceholder}>
          <Feather name="camera" size={48} color={theme.colors.gray600} />
          <Text style={styles.title}>Create a new post</Text>
          <Text style={styles.description}>
            Take a photo or select from your gallery
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Select Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography({ fontSize: 'lg', fontWeight: 'semiBold' }),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: s.xl,
  },
  cameraPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: s.xl,
  },
  title: {
    ...typography({ fontSize: 'xl', fontWeight: 'bold' }),
    marginTop: s.md,
    marginBottom: s.sm,
    textAlign: 'center',
  },
  description: {
    ...typography({ fontSize: 'md' }),
    color: theme.colors.gray600,
    textAlign: 'center',
    marginBottom: s.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: s.sm,
    paddingHorizontal: s.xl,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    ...typography({ fontSize: 'md', fontWeight: 'semiBold' }),
    color: theme.colors.white,
  },
});