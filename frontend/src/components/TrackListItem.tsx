import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Song } from '../types/models';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TrackListItemProps {
  song: Song;
  index: number;
  onPress: (song: Song) => void;
}

const TrackListItem: React.FC<TrackListItemProps> = ({ song, index, onPress }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    indexText: {
      fontSize: 14,
      color: theme.colors.text,
      width: 30,
      textAlign: 'center',
    },
    albumArt: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.card,
      marginRight: 10,
      borderRadius: 4,
    },
    titleArtistContainer: {
      flex: 3,
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    artistText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    albumText: {
      flex: 2,
      fontSize: 14,
      color: theme.colors.text,
    },
    dateAddedText: {
      flex: 1.5,
      fontSize: 14,
      color: theme.colors.text,
    },
    timeText: {
      flex: 0.8,
      fontSize: 14,
      color: theme.colors.text,
      textAlign: 'right',
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    actionIcon: {
      fontSize: 20,
      color: theme.colors.text,
      marginLeft: 10,
    },
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <TouchableOpacity style={styles.rowContainer} onPress={() => onPress(song)} activeOpacity={0.7}>
      <Text style={styles.indexText}>{index + 1}</Text>
      {song.coverArtUrl ? (
        <Image source={{ uri: song.coverArtUrl }} style={styles.albumArt} />
      ) : (
        <View style={styles.albumArt} />
      )}
      <View style={styles.titleArtistContainer}>
        <Text style={styles.titleText} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.artistText} numberOfLines={1}>{song.artist}</Text>
      </View>
      <Text style={styles.albumText} numberOfLines={1}>{song.album}</Text>
      <Text style={styles.dateAddedText} numberOfLines={1}>{song.dateAdded || 'N/A'}</Text>
      <Text style={styles.timeText}>{formatTime(song.duration || 0)}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <Icon name="plus" style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="heart-outline" style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TrackListItem;