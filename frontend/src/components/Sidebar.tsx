import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MdAccountCircle, MdHome, MdSearch, MdRadio, MdPlaylistPlay, MdAlbum, MdMusicNote, MdVideoLibrary, MdPeople, MdAddCircle, MdSettings, MdOutlineQueueMusic } from 'react-icons/md';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Playlist: undefined;
  Settings: undefined;
  MusicPlayerExpanded: undefined;
};

type SidebarNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type SidebarRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface SidebarProps {
  navigation: SidebarNavigationProp;
  route: SidebarRouteProp;
}

const Sidebar: React.FC<SidebarProps> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const currentRouteName = route.name;

  const styles = StyleSheet.create({
    container: {
      width: 250, // Fixed width for the sidebar
      backgroundColor: theme.colors.background,
      paddingVertical: 20,
      borderRightWidth: 1,
      borderColor: theme.colors.border,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 30,
    },
    profileIcon: {
      fontSize: 24,
      color: theme.colors.primary,
      marginRight: 10,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    navItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 15,
      marginBottom: 5,
    },
    navIcon: {
      fontSize: 20,
      color: theme.colors.text,
      marginRight: 10,
    },
    navText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    activeNavItem: {
      backgroundColor: theme.colors.card, // Highlight active item
      borderLeftColor: theme.colors.secondary,
      borderLeftWidth: 3,
    },
    activeNavText: {
      color: theme.colors.secondary,
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 15,
    },
    playlistItem: {
      paddingVertical: 8,
      paddingHorizontal: 15,
    },
    playlistText: {
      fontSize: 15,
      color: theme.colors.text,
    },
    createPlaylistButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginTop: 10,
      marginBottom: 10,
    },
    createPlaylistIcon: {
      fontSize: 20,
      color: theme.colors.text,
      marginRight: 10,
    },
    createPlaylistText: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  // Dummy data for playlists - replace with actual data from backend
  const playlists = [
    { id: '1', name: 'Vocal Lo-Fi' },
    { id: '2', name: 'trip road' },
    { id: '3', name: 'Top Songs 2022 BEST HITS' },
    { id: '4', name: 'tiktok' },
    { id: '5', name: 'thunderstorm ambiance' },
    { id: '6', name: 'Synthwave' },
    { id: '7', name: 'Same as be dead' },
    { id: '8', name: 'Rain and Thunders' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <MdAccountCircle style={styles.profileIcon} />
        <Text style={styles.profileName}>Joe</Text>
      </View>

      <TouchableOpacity
        style={{ ...styles.navItem, ...(currentRouteName === 'Home' && styles.activeNavItem) }}
        onPress={() => navigateTo('Home')}
      >
        <MdHome style={{ ...styles.navIcon, ...(currentRouteName === 'Home' && styles.activeNavText) }} />
        <Text style={{ ...styles.navText, ...(currentRouteName === 'Home' && styles.activeNavText) }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.navItem, ...(currentRouteName === 'Search' && styles.activeNavItem) }}
        onPress={() => navigateTo('Search')}
      >
        <MdSearch style={{ ...styles.navIcon, ...(currentRouteName === 'Search' && styles.activeNavText) }} />
        <Text style={{ ...styles.navText, ...(currentRouteName === 'Search' && styles.activeNavText) }}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.navItem, ...(currentRouteName === 'MusicPlayerExpanded' && styles.activeNavItem) }}
        onPress={() => navigateTo('MusicPlayerExpanded')}
      >
        <MdOutlineQueueMusic style={{ ...styles.navIcon, ...(currentRouteName === 'MusicPlayerExpanded' && styles.activeNavText) }} />
        <Text style={{ ...styles.navText, ...(currentRouteName === 'MusicPlayerExpanded' && styles.activeNavText) }}>Now Playing</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>MY COLLECTION</Text>
      <TouchableOpacity style={styles.navItem} onPress={() => { /* navigate to Mixes & Radio */ }}>
        <MdRadio style={styles.navIcon} />
        <Text style={styles.navText}>Mixes & Radio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.navItem, ...(currentRouteName === 'Playlist' && styles.activeNavItem) }}
        onPress={() => navigateTo('Playlist')}
      >
        <MdPlaylistPlay style={{ ...styles.navIcon, ...(currentRouteName === 'Playlist' && styles.activeNavText) }} />
        <Text style={{ ...styles.navText, ...(currentRouteName === 'Playlist' && styles.activeNavText) }}>Playlists</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => { /* navigate to Albums */ }}>
        <MdAlbum style={styles.navIcon} />
        <Text style={styles.navText}>Albums</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => { /* navigate to Tracks */ }}>
        <MdMusicNote style={styles.navIcon} />
        <Text style={styles.navText}>Tracks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => { /* navigate to Videos */ }}>
        <MdVideoLibrary style={styles.navIcon} />
        <Text style={styles.navText}>Videos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => { /* navigate to Artists */ }}>
        <MdPeople style={styles.navIcon} />
        <Text style={styles.navText}>Artists</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>PLAYLISTS</Text>
      <TouchableOpacity style={styles.createPlaylistButton} onPress={() => { /* create new playlist */ }}>
        <MdAddCircle style={styles.createPlaylistIcon} />
        <Text style={styles.createPlaylistText}>Create...</Text>
      </TouchableOpacity>
      {playlists.map((playlist) => (
        <TouchableOpacity key={playlist.id} style={styles.playlistItem} onPress={() => { /* navigate to playlist detail */ }}>
          <Text style={styles.playlistText}>{playlist.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={{ ...styles.navItem, ...(currentRouteName === 'Settings' && styles.activeNavItem) }}
        onPress={() => navigateTo('Settings')}
      >
        <MdSettings style={{ ...styles.navIcon, ...(currentRouteName === 'Settings' && styles.activeNavText) }} />
        <Text style={{ ...styles.navText, ...(currentRouteName === 'Settings' && styles.activeNavText) }}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Sidebar;