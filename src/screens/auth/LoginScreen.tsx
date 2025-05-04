import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonComponents} from '../../components';
import { globalStyles } from '../../styles/globalStyles';

const LoginScreen = () => {
  return (
    <View style={[globalStyles.container]}>
      <Text>LoginScreen</Text>
      <ButtonComponents
        text="Forgot Password"
        onPress={() => console.log('Login')}
        icon={<View></View>}
      />
    </View>
  );
};

export default LoginScreen;
