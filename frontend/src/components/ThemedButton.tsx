import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { lightTheme } from '../themes';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  style?: object; // Allow passing additional styles
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, iconName, iconSize, iconColor, style, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = StyleSheet.create({
    container: {
      backgroundColor: lightTheme.colors.background,
      borderRadius: 8,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      opacity: isHovered && Platform.OS === 'web' ? 0.8 : 1, // Apply hover effect only on web
    },
    text: {
      color: lightTheme.colors.text,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: iconName ? 10 : 0,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyles.container, style]} // Apply base styles and then any passed-in styles
      activeOpacity={0.7}
      onMouseEnter={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
      onMouseLeave={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}
      {...props}
    >
      {iconName && <Icon name={iconName} size={iconSize || 18} color={iconColor || lightTheme.colors.text} />}
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
