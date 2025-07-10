import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import ThemedStackNavigator from './src/navigation/ThemedStackNavigator';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <ThemedStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;


