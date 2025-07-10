import React from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme } from '../themes';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  // Add other props you might need, e.g., disabled, accessibilityLabel
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, ...props }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: lightTheme.colors.background, // White background
      borderRadius: 8,
      overflow: 'hidden', // Ensures content respects border radius
    },
    buttonText: {
      color: lightTheme.colors.primary, // Black text
      textAlign: 'center',
      paddingVertical: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer} activeOpacity={0.7} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
