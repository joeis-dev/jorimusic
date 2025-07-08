import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const SettingsScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    // Implement actual language change logic here
    alert(`Language changed to ${lang}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language</Text>
        <View style={styles.languageOptions}>
          <TouchableOpacity onPress={() => handleLanguageChange('English')}>
            <Text style={[styles.languageText, selectedLanguage === 'English' && styles.selectedLanguageText]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLanguageChange('Spanish')}>
            <Text style={[styles.languageText, selectedLanguage === 'Spanish' && styles.selectedLanguageText]}>Español</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add more settings options here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageOptions: {
    flexDirection: 'row',
    gap: 15,
  },
  languageText: {
    fontSize: 16,
    color: '#007AFF',
  },
  selectedLanguageText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SettingsScreen;