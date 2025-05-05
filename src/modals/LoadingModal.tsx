import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { TextComponents } from '../components';
import { appColors } from '../contants/appColors';

interface Props {
    visible: boolean;
    mess?: string;
}
const LoadingModal = (props: Props) => {
    const { visible, mess } = props;
  return (
    <Modal visible={visible} style={{ flex: 1 }} transparent statusBarTranslucent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator color={appColors.white} size={32} />
            <TextComponents text='Loading' color={appColors.white} />
        </View>
    </Modal>
  )
}

export default LoadingModal