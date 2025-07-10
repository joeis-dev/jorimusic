import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from '../components/ThemedButton';

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    // Implement actual language change logic here
    alert(`Language changed to ${lang}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: theme.colors.primary,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    settingLabel: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    languageOptions: {
      flexDirection: 'row',
      gap: 15,
    },
    languageText: {
      fontSize: 16,
      color: theme.colors.primary,
    },
    selectedLanguageText: {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          trackColor={{ false: theme.colors.border, true: theme.colors.secondary }}
          thumbColor={theme.colors.primary}
          ios_backgroundColor={theme.colors.background}
          onValueChange={toggleTheme}
          value={theme.colors.background === theme.colors.background} // Check if current theme is dark
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language</Text>
        <View style={styles.languageOptions}>
          <ThemedButton title="English" onPress={() => handleLanguageChange('English')} />
          <ThemedButton title="Español" onPress={() => handleLanguageChange('Spanish')} />
        </View>
      </View>

      {/* Add more settings options here */}
    </View>
  );
};

export default SettingsScreen;