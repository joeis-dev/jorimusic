import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, Dimensions } from 'react-native';
import { login } from '../services/api';

interface AuthScreenProps {
  navigation: any; // You might want to use a more specific type from @react-navigation/native
}

const { width } = Dimensions.get('window');

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
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
        <Text style={styles.icon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.7, // 70% of screen width
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1, // Take remaining space
    height: 50,
  },
  buttonContainer: {
    width: width * 0.5, // 50% of screen width
    marginTop: 10,
  },
});

export default AuthScreen;