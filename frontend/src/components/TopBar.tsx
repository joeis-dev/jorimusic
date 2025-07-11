import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MdArrowBack, MdArrowForward, MdSearch, MdNotifications, MdAccountCircle } from 'react-icons/md';
import { useNavigation } from '@react-navigation/native';
import { useSearch } from '../context/SearchContext';

const TopBar: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { setSearchQuery } = useSearch();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      padding: 5,
    },
    icon: {
      fontSize: 24,
      color: theme.colors.primary,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginLeft: 20,
      marginRight: 20,
      height: 40,
    },
    searchInput: {
      flex: 1,
      color: theme.colors.primary,
      fontSize: 16,
      marginLeft: 10,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MdArrowBack style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goForward()} style={styles.iconButton}>
          <MdArrowForward style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MdSearch style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={theme.colors.text}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <MdNotifications style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MdAccountCircle style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;