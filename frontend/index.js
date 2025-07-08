import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('frontend', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('frontend', {
    rootTag: document.getElementById('root'),
  });
}