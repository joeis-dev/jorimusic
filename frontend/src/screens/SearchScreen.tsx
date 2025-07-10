import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getAllSongs } from '../services/api';
import { Song } from '../types/models';

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const filteredResults = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(text.toLowerCase()) ||
          song.artist.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const renderSongItem = ({ item }: { item: Song }) => (
    <TouchableOpacity style={styles.songItem}>
      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.songArtist}>{item.artist}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading songs for search...</Text>
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search for songs or artists..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchResults}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.resultsList}
        ListEmptyComponent={
          searchText.length > 0 ? (
            <Text style={styles.noResultsText}>No results found.</Text>
          ) : (
            <Text style={styles.noResultsText}>Start typing to search.</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  searchInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  resultsList: {
    flexGrow: 1,
    width: '100%',
  },
  songItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 14,
    color: 'gray',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
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
});

export default SearchScreen;
