import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MainAppNavigator from './navigation/MainAppNavigator';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MusicPlayer from './components/MusicPlayer';
import { useTheme } from './context/ThemeContext';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import { SearchProvider } from './context/SearchContext';

interface MainLayoutProps {
  navigation: any;
  route: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({ navigation, route }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      // flex: 1, // Managed by Panel
    },
    mainContent: {
      flex: 1,
    },
    resizeHandle: {
      width: 5,
      backgroundColor: theme.colors.border,
      cursor: 'ew-resize',
    },
  });

  // Placeholder for current song - will be managed by context later
  const currentSong = null;

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <PanelGroup direction="horizontal">
          <Panel defaultSize={10} minSize={5}>
            <Sidebar navigation={navigation} route={route} />
          </Panel>
          <PanelResizeHandle style={styles.resizeHandle} />
          <Panel>
            <SearchProvider>
              <View style={styles.content}>
                <TopBar />
                <View style={styles.mainContent}>
                  <MainAppNavigator />
                </View>
                <MusicPlayer currentSong={currentSong} />
              </View>
            </SearchProvider>
          </Panel>
        </PanelGroup>
      ) : (
        <>
          <Sidebar navigation={navigation} route={route} />
          <SearchProvider>
            <View style={styles.content}>
              <TopBar />
              <View style={styles.mainContent}>
                <MainAppNavigator />
              </View>
              <MusicPlayer currentSong={currentSong} />
            </View>
          </SearchProvider>
        </>
      )}
    </View>
  );
};

export default MainLayout;