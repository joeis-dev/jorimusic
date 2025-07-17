import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from '../components/ThemedButton';

interface AuthScreenProps {
  navigation: any; // You might want to use a more specific type from @react-navigation/native
}

  const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      color: theme.colors.primary,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width > 768 ? 400 : '70%', // Max width 400px on large screens, 70% on small
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 20,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 10,
    },
    icon: {
      fontSize: 20,
      marginRight: 10,
      color: theme.colors.text,
    },
    input: {
      flex: 1, // Take remaining space
      height: 50,
      color: theme.colors.primary,
    },
    buttonContainer: {
      width: width > 768 ? 200 : '50%', // Max width 200px on large screens, 50% on small
      marginTop: 10,
    },
    });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Temporarily bypass login for development/testing
  // useEffect(() => {
  //   navigation.replace('Home');
  // }, []);

  const handleLogin = async () => {
    try {
      const userData = await login(username, password);
      // Assuming successful login, navigate to Home
      Alert.alert('Login Successful', `Welcome, ${userData.username || username}!`);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password.');
      console.error('Authentication error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JoriMusic</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color={theme.colors.text} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color={theme.colors.text} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <ThemedButton title="Login" iconName="sign-in" onPress={handleLogin} />
      </View>
      {/* Add more UI elements for signup, forgot password, etc. */}
    </View>
  );
};



export default AuthScreen;