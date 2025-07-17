import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
import { getAllSongs } from '../services/api';
import { Song } from '../types/models';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from '../components/ThemedButton';
import TrackListItem from '../components/TrackListItem';
import { useSearch } from '../context/SearchContext';

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const { searchQuery } = useSearch();
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    resultsList: {
      flexGrow: 1,
      width: width > 768 ? 600 : '90%',
    },
    noResultsText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
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
  });

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const fetchedSongs = await getAllSongs();
        setAllSongs(fetchedSongs);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch all songs for search:', err);
        setError('Failed to load songs for search. Please try again later.');
        setLoading(false);
        Alert.alert('Error', 'Failed to load songs for search. Please check your backend connection.');
      }
    };

    fetchAllSongs();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredResults = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allSongs]);

  const handleSongPress = (song: Song) => {
    // Implement logic to play the song
    Alert.alert('Play Song', `Playing: ${song.title} by ${song.artist}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
        <Text style={{ color: theme.colors.text }}>Loading songs for search...</Text>
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
          const fetchAllSongsOnRetry = async () => {
            try {
              const fetchedSongs = await getAllSongs();
              setAllSongs(fetchedSongs);
              setLoading(false);
            } catch (err) {
              console.error('Failed to fetch all songs on retry:', err);
              setError('Failed to load songs for search. Please try again later.');
              setLoading(false);
              Alert.alert('Error', 'Failed to load songs for search. Please check your backend connection.');
            }
          };
          fetchAllSongsOnRetry();
        }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.trackListHeader}>
        <Text style={{ ...styles.trackListHeaderItem, width: 30 }}>#</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 3 }}>TITLE</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 2 }}>ARTIST</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 2 }}>ALBUM</Text>
        <Text style={{ ...styles.trackListHeaderItem, flex: 0.8, textAlign: 'right' }}>TIME</Text>
        <View style={{ width: 80 }} />{/* Placeholder for action icons */}
      </View>
      <FlatList
        data={searchResults}
        renderItem={({ item, index }) => <TrackListItem song={item} index={index} onPress={handleSongPress} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.resultsList}
        ListEmptyComponent={
          searchQuery.length > 0 ? (
            <Text style={styles.noResultsText}>No results found.</Text>
          ) : (
            <Text style={styles.noResultsText}>Start typing in the search bar above.</Text>
          )
        }
      />
    </View>
  );
};

export default SearchScreen;