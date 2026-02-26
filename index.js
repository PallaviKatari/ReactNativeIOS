/**
 * index.js
 *
 * GestureHandlerRootView MUST wrap the root component
 * If not, gestures will throw:
 * "TapGestureHandler must be used as a descendant of GestureHandlerRootView"
 */

import 'react-native-gesture-handler'; // MUST be first import

import React from 'react';
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';

const Root = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Root);