import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container} >
      <Text>HomeScreen</Text>
      <Button title='LogOut' onPress={() => {dispatch(removeAuth({}))}} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})