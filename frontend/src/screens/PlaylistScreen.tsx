import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ActivityIndicator, Alert } from 'react-native';
import { getAllPlaylists } from '../services/api';
import { Playlist } from '../types/models';

const PlaylistScreen: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <TouchableOpacity style={styles.playlistItem}>
      <Text style={styles.playlistName}>{item.name}</Text>
      {/* Assuming songCount is not directly available from backend Playlist model, or needs to be calculated */}
      <Text style={styles.songCount}>{item.songs ? item.songs.length : 0} songs</Text>
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
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading playlists...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={() => {
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
      <Button title="Create New Playlist" onPress={handleCreatePlaylist} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  playlistList: {
    flexGrow: 1,
    width: '100%',
  },
  playlistItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  playlistName: {
    fontSize: 18,
    fontWeight: '600',
  },
  songCount: {
    fontSize: 14,
    color: 'gray',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
  },
  noPlaylistsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});

export default PlaylistScreen;
