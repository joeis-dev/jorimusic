import { AppRegistry } from 'react-native';
import App from './App.tsx';
import './src/styles/global.css';

AppRegistry.registerComponent('frontend', () => App);

AppRegistry.runApplication('frontend', {
  rootTag: document.getElementById('root'),
});