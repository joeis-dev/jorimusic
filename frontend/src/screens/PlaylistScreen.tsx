import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

interface Playlist {
  id: string;
  name: string;
  songCount: number;
}

const dummyPlaylists: Playlist[] = [
  { id: '1', name: 'My Favorites', songCount: 15 },
  { id: '2', name: 'Workout Mix', songCount: 30 },
  { id: '3', name: 'Chill Vibes', songCount: 22 },
];

const PlaylistScreen: React.FC = () => {
  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity style={styles.playlistItem}>
      <Text style={styles.playlistName}>{item.name}</Text>
      <Text style={styles.songCount}>{item.songCount} songs</Text>
    </TouchableOpacity>
  );

  const handleCreatePlaylist = () => {
    // Implement logic to create a new playlist
    console.log('Create New Playlist button pressed');
    alert('Create New Playlist functionality not yet implemented.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Playlists</Text>
      <FlatList
        data={dummyPlaylists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id}
        style={styles.playlistList}
      />
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
});

export default PlaylistScreen;