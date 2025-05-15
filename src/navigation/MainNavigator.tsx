import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import { QRCodeScreen } from '../screens/qrcode'

const MainNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
    </Stack.Navigator>
  )
}

export default MainNavigator