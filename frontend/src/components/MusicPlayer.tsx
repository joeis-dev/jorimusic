import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import TrackPlayer, { Capability, usePlaybackState, State } from 'react-native-track-player';
import { getSongStreamUrl } from '../services/api';
import { Song } from '../types/models';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from './ThemedButton';

interface MusicPlayerProps {
  currentSong: Song | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSong }) => {
  const { theme } = useTheme();
  const playbackState = usePlaybackState();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.colors.primary,
    },
    songInfo: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.colors.text,
    },
    noSongText: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });

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
        <ActivityIndicator size="small" color={theme.colors.secondary} />
        <Text style={{ color: theme.colors.text }}>Loading player...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentSong ? (
        <View>
          <Text style={styles.title}>Now Playing:</Text>
          <Text style={styles.songInfo}>{currentSong.title} - {currentSong.artist}</Text>
          <ThemedButton
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

export default MusicPlayer;