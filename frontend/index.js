import { AppRegistry } from 'react-native';
import App from './App.tsx';

AppRegistry.registerComponent('frontend', () => App);

AppRegistry.runApplication('frontend', {
  rootTag: document.getElementById('root'),
});