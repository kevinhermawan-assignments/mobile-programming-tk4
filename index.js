import React from 'react';
import { AppRegistry } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

import App from './src/App';
import { name as appName } from './app.json';
import { AppProvider } from './src/components/AppContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    secondary: '#BBDEFB',
    primaryContainer: '#2196F3',
    onPrimaryContainer: '#FFFFFF',
  },
};

function Main() {
  return (
    <AppProvider>
      <PaperProvider theme={{ ...theme, dark: false }}>
        <App />
      </PaperProvider>
    </AppProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
