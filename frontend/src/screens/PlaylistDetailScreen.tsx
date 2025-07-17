import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Playlist, Song } from '../types/models';
import TrackListItem from '../components/TrackListItem';
import ThemedButton from '../components/ThemedButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PlaylistDetailScreenProps {
  route: any;
  navigation: any;
}

const PlaylistDetailScreen: React.FC<PlaylistDetailScreenProps> = ({ route, navigation }) => {
  const { playlistId, playlistName } = route.params;
  const { theme } = useTheme();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    backButton: {
      marginRight: 10,
    },
    playlistTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    playlistInfo: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 20,
    },
    playShuffleButtons: {
      flexDirection: 'row',
      marginBottom: 20,
      gap: 10,
    },
    trackListHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 5,
    },
    trackListHeaderItem: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.text,
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
  });

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        // In a real app, you would fetch playlist details by playlistId from your API
        // For now, we'll simulate fetching a playlist with some songs
        const dummyPlaylist: Playlist = {
          id: playlistId,
          name: playlistName,
          songs: [
            { id: 's1', title: 'Song 1', artist: 'Artist A', album: 'Album X', duration: 200, filePath: 'path/to/song1.mp3', coverArtUrl: '' },
            { id: 's2', title: 'Song 2', artist: 'Artist B', album: 'Album Y', duration: 250, filePath: 'path/to/song2.mp3', coverArtUrl: '' },
            { id: 's3', title: 'Song 3', artist: 'Artist C', album: 'Album Z', duration: 180, filePath: 'path/to/song3.mp3', coverArtUrl: '' },
          ],
        };
        setPlaylist(dummyPlaylist);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch playlist details:', err);
        setError('Failed to load playlist details. Please try again later.');
        setLoading(false);
        Alert.alert('Error', 'Failed to load playlist details.');
      }
    };

    fetchPlaylistDetails();
  }, [playlistId, playlistName]);

  const handleSongPress = (song: Song) => {
    // Implement logic to play the song
    Alert.alert('Play Song', `Playing: ${song.title} by ${song.artist}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
        <Text style={{ color: theme.colors.text }}>Loading playlist...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <ThemedButton title="Retry" onPress={() => {
          setLoading(true);
          setError(null);
          // Re-fetch data on retry
          // fetchPlaylistDetails(); // Uncomment in real app
        }} />
      </View>
    );
  }

  if (!playlist) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Playlist not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.playlistTitle}>{playlist.name}</Text>
      </View>
      <Text style={styles.playlistInfo}>{playlist.songs ? playlist.songs.length : 0} songs</Text>

      <View style={styles.playShuffleButtons}>
        <ThemedButton title="Play" iconName="play" onPress={() => { /* Play all songs in playlist */ }} />
        <ThemedButton title="Shuffle" iconName="random" onPress={() => { /* Shuffle all songs in playlist */ }} />
      </View>

      <View style={styles.trackListHeader}>
        <Text style={{ ...styles.trackListHeaderItem, width: 30 }}>#</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 3 }}>TITLE</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 2 }}>ARTIST</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 2 }}>ALBUM</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 0.8, textAlign: 'right' }}>TIME</Text>
        <View style={{ width: 80 }} />{/* Placeholder for action icons */}
      </View>
      <FlatList
        data={playlist.songs}
        renderItem={({ item, index }) => <TrackListItem song={item} index={index} onPress={handleSongPress} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PlaylistDetailScreen;