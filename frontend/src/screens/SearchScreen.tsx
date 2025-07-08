import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

interface Song {
  id: string;
  title: string;
  artist: string;
}

const dummySongs: Song[] = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen' },
  { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
  { id: '3', title: 'Hotel California', artist: 'Eagles' },
  { id: '4', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
  { id: '5', title: 'Billie Jean', artist: 'Michael Jackson' },
  { id: '6', title: 'Like a Rolling Stone', artist: 'Bob Dylan' },
  { id: '7', title: 'One', artist: 'U2' },
  { id: '8', title: 'Imagine', artist: 'John Lennon' },
  { id: '9', title: 'Hey Jude', artist: 'The Beatles' },
  { id: '10', title: "Sweet Child o' Mine", artist: "Guns N' Roses" },
];

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const filteredResults = dummySongs.filter(
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
        keyExtractor={(item) => item.id}
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
});

export default SearchScreen;