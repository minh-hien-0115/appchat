import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {appInfor} from '../contants/appInfor';
import SpaceComponents from '../components/SpaceComponents';
import {appColors} from '../contants/appColors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-images.png')}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{
          width: appInfor.sizes.WIDTH * 0.8,
        }}
        resizeMode="contain"
      />
      <SpaceComponents height={16} />
      <ActivityIndicator color={appColors.primary} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;
