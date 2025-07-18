import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, useWindowDimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login, signup } from '../services/api';

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
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      Alert.alert('Login Successful', 'You have successfully logged in!');
      navigation.replace('Home');
    } catch (error: any) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred during login.');
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      const response = await signup(email, password, firstName, lastName);
      console.log('Sign up successful:', response);
      Alert.alert('Sign Up Successful', 'Your account has been created!');
      setIsLoginMode(true); // Switch to login mode after successful signup
    } catch (error: any) {
      console.error('Sign up failed:', error);
      Alert.alert('Sign Up Failed', error.response?.data?.message || 'An error occurred during sign up.');
    }
  };

  const _signIn = () => {
    // Redirect to backend for Google OAuth2 flow
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth2/redirect`);
    window.location.href = `http://localhost:8080/oauth2/authorize/google?redirect_uri=${redirectUri}`;
  };

  // Callback function for Google Identity Services (Web)
  const handleCredentialResponse = async (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Here you would send the response.credential (ID token) to your backend for verification
    // and user authentication/registration.
    // Example: await googleLogin(response.credential);
    Alert.alert('Google Login Successful', 'You have successfully signed in with Google!');
    navigation.replace('Home');
  };

  useEffect(() => {
    if (Platform.OS === 'web' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID, // Replace with your actual client ID
        callback: handleCredentialResponse,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }  // customization attributes
      );
    }
  }, [isLoginMode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JoriMusic</Text>

      {!isLoginMode && (
        <>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color={theme.colors.text} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color={theme.colors.text} />
            <TextInput
              style={styles.input}
              placeholder="Last Name (Optional)"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>
        </>
      )}

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color={theme.colors.text} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
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

      {!isLoginMode && (
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={theme.colors.text} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <ThemedButton
          title="Login"
          iconName="sign-in"
          onPress={handleLogin}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ThemedButton
          title="Sign Up"
          iconName="user-plus"
          onPress={() => setIsLoginMode(false)}
          style={{ marginTop: 10 }}
        />
      </View>

      {Platform.OS === 'web' ? (
        <div id="google-signin-button" style={{ marginTop: 20 }}></div>
      ) : (
        <View style={styles.buttonContainer}>
          <ThemedButton title="Sign in with Google" iconName="google" onPress={_signIn} style={{ marginTop: 20 }} />
        </View>
      )}
    </View>
  );
};

export default AuthScreen;