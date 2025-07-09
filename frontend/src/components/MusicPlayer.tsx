import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import TrackPlayer, { Capability, usePlaybackState, State } from 'react-native-track-player';
import { getSongStreamUrl } from '../services/api';
import { Song } from '../types/models';

interface MusicPlayerProps {
  currentSong: Song | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSong }) => {
  const playbackState = usePlaybackState();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
          ],
        });
        setIsPlayerReady(true);
      } catch (error) {
        console.error('Failed to setup TrackPlayer:', error);
        Alert.alert('Player Error', 'Failed to initialize music player.');
      }
    };

    setupPlayer();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  useEffect(() => {
    const loadAndPlaySong = async () => {
      if (isPlayerReady && currentSong && currentSong.filePath) {
        try {
          await TrackPlayer.reset();
          const track = {
            url: getSongStreamUrl(currentSong.filePath),
            title: currentSong.title,
            artist: currentSong.artist,
            album: currentSong.album,
            artwork: currentSong.coverArtUrl, // Optional
          };
          await TrackPlayer.add(track);
          await TrackPlayer.play();
        } catch (error) {
          console.error('Failed to load or play song:', error);
          Alert.alert('Playback Error', `Failed to play ${currentSong.title}.`);
        }
      }
    };

    loadAndPlaySong();
  }, [currentSong, isPlayerReady]);

  const togglePlayback = async () => {
    if (playbackState.state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  if (!isPlayerReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text>Loading player...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentSong ? (
        <View>
          <Text style={styles.title}>Now Playing:</Text>
          <Text style={styles.songInfo}>{currentSong.title} - {currentSong.artist}</Text>
          <Button
            title={playbackState.state === State.Playing ? 'Pause' : 'Play'}
            onPress={togglePlayback}
          />
        </View>
      ) : (
        <Text style={styles.noSongText}>Select a song to play</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  songInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  noSongText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default MusicPlayer;
