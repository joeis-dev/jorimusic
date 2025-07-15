import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Song } from '../types/models';

interface MusicPlayerExpandedProps {
  navigation: any;
  route: any;
}

const MusicPlayerExpanded: React.FC<MusicPlayerExpandedProps> = ({ navigation, route }) => {
  const { theme } = useTheme();
  // Assuming currentSong and playQueue are passed via route params or a context
  const { currentSong, playQueue } = route.params || { currentSong: null, playQueue: [] };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
    },
    leftPanel: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    albumArt: {
      width: '90%',
      aspectRatio: 1,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      marginBottom: 20,
    },
    songTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: 5,
    },
    songArtist: {
      fontSize: 18,
      color: theme.colors.text,
      textAlign: 'center',
    },
    rightPanel: {
      flex: 1,
      padding: 20,
    },
    queueTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 15,
    },
    queueItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    queueItemText: {
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
    },
    queueItemArtist: {
      fontSize: 14,
      color: theme.colors.text,
    },
    removeIcon: {
      fontSize: 20,
      color: theme.colors.text,
      marginLeft: 10,
    },
    topControls: {
      position: 'absolute',
      top: 10,
      left: 10,
      flexDirection: 'row',
      zIndex: 1,
    },
    controlButton: {
      padding: 10,
    },
    controlIcon: {
      fontSize: 24,
      color: theme.colors.primary,
    },
  });

  const renderQueueItem = ({ item }: { item: Song }) => (
    <View style={styles.queueItem}>
      <View>
        <Text style={styles.queueItemText} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.queueItemArtist} numberOfLines={1}>{item.artist}</Text>
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Remove from Queue', `Remove ${item.title}?`)}>
        <Icon name="close-circle-outline" style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topControls}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.controlButton}>
          <Icon name="chevron-down" style={styles.controlIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Full Screen', 'Toggle full screen')} style={styles.controlButton}>
          <Icon name="fullscreen" style={styles.controlIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.leftPanel}>
        {currentSong && currentSong.coverArtUrl ? (
          <Image source={{ uri: currentSong.coverArtUrl }} style={styles.albumArt} />
        ) : (
          <View style={styles.albumArt} />
        )}
        {currentSong && <Text style={styles.songTitle}>{currentSong.title}</Text>}
        {currentSong && <Text style={styles.songArtist}>{currentSong.artist}</Text>}
      </View>

      <View style={styles.rightPanel}>
        <Text style={styles.queueTitle}>Play Queue</Text>
        <FlatList
          data={playQueue}
          renderItem={renderQueueItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default MusicPlayerExpanded;