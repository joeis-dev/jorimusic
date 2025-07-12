import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';

import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainLayout from '../MainLayout';

const Stack = createStackNavigator();

const ThemedStackNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.primary,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={MainLayout} options={{ headerShown: false }} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ThemedStackNavigator;
