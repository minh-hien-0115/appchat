import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigation/AppRouters';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
