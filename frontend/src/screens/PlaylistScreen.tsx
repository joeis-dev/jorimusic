import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
import { getAllPlaylists } from '../services/api';
import { Playlist } from '../types/models';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from '../components/ThemedButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlaylistScreen: React.FC = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.primary,
    },
    playlistList: {
      flexGrow: 1,
      width: width > 768 ? 600 : '100%',
    },
    playlistItem: {
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    playlistName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    songCount: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    errorText: {
      color: theme.colors.notification,
      fontSize: 18,
      marginBottom: 20,
    },
    noPlaylistsText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: theme.colors.text,
    },
  });

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const fetchedPlaylists = await getAllPlaylists();
        setPlaylists(fetchedPlaylists);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch playlists:', err);
        setError('Failed to load playlists. Please try again later.');
        setLoading(false);
        Alert.alert('Error', 'Failed to load playlists. Please check your backend connection.');
      }
    };

    fetchPlaylists();
  }, []);

  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity style={styles.playlistItem} activeOpacity={0.7}>
      <View>
        <Text style={styles.playlistName}>{item.name}</Text>
        {/* Assuming songCount is not directly available from backend Playlist model, or needs to be calculated */}
        <Text style={styles.songCount}>{item.songs ? item.songs.length : 0} songs</Text>
      </View>
      <Icon name="chevron-right" size={20} color={theme.colors.text} />
    </TouchableOpacity>
  );

  const handleCreatePlaylist = () => {
    // Implement logic to create a new playlist
    console.log('Create New Playlist button pressed');
    Alert.alert('Feature Not Implemented', 'Creating new playlists is not yet implemented.');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
        <Text style={{ color: theme.colors.text }}>Loading playlists...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <ThemedButton title="Retry" iconName="refresh" onPress={() => {
          setLoading(true);
          setError(null);
          // Re-fetch data on retry
          const fetchPlaylistsOnRetry = async () => {
            try {
              const fetchedPlaylists = await getAllPlaylists();
              setPlaylists(fetchedPlaylists);
              setLoading(false);
            } catch (err) {
              console.error('Failed to fetch playlists on retry:', err);
              setError('Failed to load playlists. Please try again later.');
              setLoading(false);
              Alert.alert('Error', 'Failed to load playlists. Please check your backend connection.');
            }
          };
          fetchPlaylistsOnRetry();
        }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Playlists</Text>
      {playlists.length > 0 ? (
        <FlatList
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.playlistList}
        />
      ) : (
        <Text style={styles.noPlaylistsText}>No playlists found. Create one!</Text>
      )}
      <ThemedButton title="Create New Playlist" iconName="plus" onPress={handleCreatePlaylist} />
    </View>
  );
};

export default PlaylistScreen;