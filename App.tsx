import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const {getItem, setItem} = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
  }

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {
            accessToken ? <MainNavigator /> : <AuthNavigator />
          }
        </NavigationContainer>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
