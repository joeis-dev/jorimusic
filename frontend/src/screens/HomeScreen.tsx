import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Dummy data for demonstration
  const recentlyPlayed = [
    { id: '1', title: 'Song A', artist: 'Artist X' },
    { id: '2', title: 'Song B', artist: 'Artist Y' },
    { id: '3', title: 'Song C', artist: 'Artist Z' },
  ];

  const recommendedSongs = [
    { id: '4', title: 'Song D', artist: 'Artist A' },
    { id: '5', title: 'Song E', artist: 'Artist B' },
    { id: '6', title: 'Song F', artist: 'Artist C' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to JoriMusic!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        {recentlyPlayed.map((song) => (
          <Text key={song.id} style={styles.songItem}>- {song.title} by {song.artist}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        {recommendedSongs.map((song) => (
          <Text key={song.id} style={styles.songItem}>- {song.title} by {song.artist}</Text>
        ))}
      </View>

      <View style={styles.navigationButtons}>
        <Button title="Go to Playlists" onPress={() => navigation.navigate('Playlist')} />
        <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
        <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  songItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  navigationButtons: {
    marginTop: 20,
    gap: 10,
  },
});

export default HomeScreen;