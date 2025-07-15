import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Song } from '../types/models';

interface SongCardProps {
  song: Song;
  onPress: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onPress }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    cardContainer: {
      width: 150, // Fixed width for the card
      marginRight: 15,
      marginBottom: 10,
    },
    albumArt: {
      width: '100%',
      height: 150,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      marginBottom: 8,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 2,
    },
    artist: {
      fontSize: 12,
      color: theme.colors.text,
    },
  });

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(song)} activeOpacity={0.7}>
      {song.coverArtUrl ? (
        <Image source={{ uri: song.coverArtUrl }} style={styles.albumArt} />
      ) : (
        <View style={styles.albumArt} />
      )}
      <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
      <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
    </TouchableOpacity>
  );
};

export default SongCard;