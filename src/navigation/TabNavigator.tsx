import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HamburgerMenu, Home, Messenger, UserAdd } from 'iconsax-react-nativejs';
import React from 'react';
import { HomeScreen } from '../screens/home';
import { AddFriendScreen, MenuScreen, MessScreen } from '../screens/tab';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({color}) => <Home color={color} size={20} />,
        }}/>
      <Tab.Screen name="Đoạn chat" component={MessScreen} options={{
          tabBarIcon: ({color}) => <Messenger color={color} size={20} />,
        }}/>
      <Tab.Screen name="Bạn bè" component={AddFriendScreen} options={{
          tabBarIcon: ({color}) => <UserAdd color={color} size={20} />,
        }}/>
      <Tab.Screen name="Menu" component={MenuScreen} options={{
          tabBarIcon: ({color}) => <HamburgerMenu color={color} size={20} />,
        }}/>
    </Tab.Navigator>
  )
}

export default TabNavigator