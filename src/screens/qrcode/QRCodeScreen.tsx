import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import authenticationAPI from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';

const QRCodeScreen = ({navigation, route}: any) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {code, email, password, username} = route.params;
  
    const [currentCode, setCurrentCode] = useState<string>(code);
    const [codeValues, setCodeValues] = useState<string[]>([]);
    const [limit, setLimit] = useState(59);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

  const handleResendQR = async () => {
    setErrorMessage('');
    setCodeValues(['', '', '', '']);

    const api = `/QR`;
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );

      setLimit(59);
      setCurrentCode(res.data.code);
      setIsLoading(false);
      console.log(res.data.code);
    } catch (error) {
      setIsLoading(false);
      console.log(`Không thể gửi mã QR! ${error}`);
    }
  };

  const handleQR = async () => {
        const api = `/register`;
        const data = {
          email,
          password,
          username: username ?? '',
        };

        try {
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage('Người dùng đã tồn tại!!!');
          console.log(`Không thể tạo người dùng mới ${error}`);
        }
    }


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Đang tải mã QR...</Text>
      </View>
    );
  }

  if (!userId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Không tìm thấy thông tin người dùng.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Mã QR của bạn</Text>
      <QRCode value={userId} size={200} />
    </View>
  );
};

export default QRCodeScreen;