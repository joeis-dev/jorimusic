import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { login } from '../services/api';

interface AuthScreenProps {
  navigation: any; // You might want to use a more specific type from @react-navigation/native
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Temporarily bypass login for development/testing
  useEffect(() => {
    navigation.replace('Home');
  }, []);

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
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {/* Add more UI elements for signup, forgot password, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default AuthScreen;
