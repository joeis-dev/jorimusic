import React from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon
import { useTheme } from '../context/ThemeContext';
import { lightTheme } from '../themes';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  iconName?: string; // New prop for icon name
  iconSize?: number; // New prop for icon size
  iconColor?: string; // New prop for icon color
  // Add other props you might need, e.g., disabled, accessibilityLabel
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, iconName, iconSize, iconColor, ...props }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme.colors.primary, // Use theme primary color for button background
      borderRadius: 8,
      overflow: 'hidden', // Ensures content respects border radius
      flexDirection: 'row', // Arrange icon and text horizontally
      alignItems: 'center', // Center items vertically
      justifyContent: 'center', // Center items horizontally
      paddingVertical: 10, // Consistent vertical padding
      paddingHorizontal: 15, // Consistent horizontal padding
    },
    buttonText: {
      color: theme.colors.background, // Use theme background color for text (contrast with primary)
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: iconName ? 10 : 0, // Add margin if icon is present
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer} activeOpacity={0.7} {...props}>
      {iconName && <Icon name={iconName} size={iconSize || 18} color={iconColor || theme.colors.background} />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
