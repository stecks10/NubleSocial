import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme, typography, s } from '../../theme';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={theme.colors.gray600} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={theme.colors.gray600}
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.description}>
          Search for users, photos and more...
        </Text>
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
    padding: s.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: s.sm,
    height: 40,
  },
  searchIcon: {
    marginRight: s.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    ...typography({ fontSize: 'md' }),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: s.xl,
  },
  title: {
    ...typography({ fontSize: 'xl', fontWeight: 'bold' }),
    marginBottom: s.md,
    textAlign: 'center',
  },
  description: {
    ...typography({ fontSize: 'md' }),
    color: theme.colors.gray600,
    textAlign: 'center',
  },
});