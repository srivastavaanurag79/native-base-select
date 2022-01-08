import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { NativeBaseProvider } from 'native-base';
import { name as appName } from './app.json';

export default function Main() {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
