import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { MdOutlineQueueMusic } from "react-icons/md"; // Changed import

const TrackListItem = ({ song, index, onPress }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    artwork: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
    artist: {
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity onPress={() => onPress(song)} style={styles.container}>
      <Image source={{ uri: song.artwork }} style={styles.artwork} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {song.title}
        </Text>
        <Text style={[styles.artist, { color: theme.textSecondary }]}>
          {song.artist}
        </Text>
      </View>
      <MdOutlineQueueMusic size={24} color={theme.textPrimary} /> {/* Changed component usage */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
  },
});

export default TrackListItem;