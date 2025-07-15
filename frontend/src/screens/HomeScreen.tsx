import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, useWindowDimensions, FlatList } from 'react-native';
import { getAllSongs, getAllPlaylists } from '../services/api';
import { Song, Playlist } from '../types/models';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from '../components/ThemedButton';
import SongCard from '../components/SongCard';
import TrackListItem from '../components/TrackListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: theme.colors.primary,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 15,
      color: theme.colors.primary,
    },
    horizontalScrollContainer: {
      paddingBottom: 10,
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
    playShuffleButtons: {
      flexDirection: 'row',
      marginBottom: 20,
      gap: 10,
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
    const fetchData = async () => {
      try {
        const fetchedSongs = await getAllSongs();
        setSongs(fetchedSongs);

        const fetchedPlaylists = await getAllPlaylists();
        setPlaylists(fetchedPlaylists);

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        Alert.alert('Error', 'Failed to load data. Please check your backend connection.');
      }
    };

    fetchData();
  }, []);

  const handleSongPress = (song: Song) => {
    // Implement logic to play the song
    Alert.alert('Play Song', `Playing: ${song.title} by ${song.artist}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
        <Text style={{ color: theme.colors.text }}>Loading music data...</Text>
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
          const fetchDataOnRetry = async () => {
            try {
              const fetchedSongs = await getAllSongs();
              setSongs(fetchedSongs);

              const fetchedPlaylists = await getAllPlaylists();
              setPlaylists(fetchedPlaylists);

              setLoading(false);
            } catch (err) {
              console.error('Failed to fetch data on retry:', err);
              setError('Failed to load data. Please try again later.');
              setLoading(false);
              Alert.alert('Error', 'Failed to load data. Please check your backend connection.');
            }
          };
          fetchDataOnRetry();
        }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to JoriMusic!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
          {songs.slice(0, 5).map((song) => (
            <SongCard key={song.id} song={song} onPress={handleSongPress} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Songs</Text>
        <View style={styles.playShuffleButtons}>
          <ThemedButton title="Play" onPress={() => { /* Play all songs */ }} />
          <ThemedButton title="Shuffle" onPress={() => { /* Shuffle all songs */ }} />
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
          data={songs}
          renderItem={({ item, index }) => <TrackListItem song={item} index={index} onPress={handleSongPress} />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // Disable FlatList scrolling inside ScrollView
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Playlists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
          {playlists.map((playlist) => (
            <SongCard key={playlist.id} song={playlist as any} onPress={() => Alert.alert('Playlist', `Navigating to playlist: ${playlist.name}`)} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.navigationButtons}>
        <ThemedButton title="Go to Playlists" onPress={() => navigation.navigate('Playlist')} />
        <ThemedButton title="Go to Search" onPress={() => navigation.navigate('Search')} />
        <ThemedButton title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;