import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { getAllSongs, getAllPlaylists } from '../services/api';
import { Song, Playlist } from '../types/models';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from '../components/ThemedButton';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
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
    songItem: {
      fontSize: 16,
      marginBottom: 5,
      color: theme.colors.text,
    },
    navigationButtons: {
      marginTop: 20,
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
        <Text style={styles.sectionTitle}>All Songs</Text>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Text key={song.id} style={styles.songItem}>- {song.title} by {song.artist}</Text>
          ))
        ) : (
          <Text style={{ color: theme.colors.text }}>No songs found.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Playlists</Text>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <Text key={playlist.id} style={styles.songItem}>- {playlist.name}</Text>
          ))
        ) : (
          <Text style={{ color: theme.colors.text }}>No playlists found.</Text>
        )}
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