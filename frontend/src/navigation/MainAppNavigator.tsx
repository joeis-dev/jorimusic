import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';

import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';

import MusicPlayerExpanded from '../screens/MusicPlayerExpanded';

const Stack = createStackNavigator();

const MainAppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="MusicPlayerExpanded" component={MusicPlayerExpanded} />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;