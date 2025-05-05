import {ArrowRight, Lock, Sms} from 'iconsax-react-nativejs';
import React, {useState} from 'react';
import {Alert, Image, Switch, View} from 'react-native';
import {
  ButtonComponents,
  ContainerComponents,
  InputComponents,
  RowComponents,
  SectionComponents,
  SpaceComponents,
  TextComponents,
} from '../../components';
import {appColors} from '../../contants/appColors';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../contants/fontFamilies';
import SocialLogin from './Component/SocialLogin';
import authenticationAPI from '../../api/authApi';
import {Validate} from '../../utils/Validate';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const dispatch = useDispatch()
  
  const handleLogin = async () => {  
    const emailValidation = Validate.email(email);
    
    if (emailValidation) {
        try {
        const res = await authenticationAPI.HandleAuthentication(
          '/login',
          {email, password},
          'post',
        );
        dispatch(addAuth(res.data))
        await AsyncStorage.setItem('auth', isRemember ? JSON.stringify(res.data) : email)
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Email không hợp lệ')
    }
    
  };

  return (
    <ContainerComponents isImagesBackgournd isScroll>
      <SectionComponents
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 75,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{width: 162, height: 114, marginBottom: 30}}
        />
      </SectionComponents>

      <SectionComponents>
        <TextComponents text="Sign in" size={24} title />
        <SpaceComponents height={21} />
        <InputComponents
          value={email}
          placeholder="abc@gmail.com"
          onChange={val => setEmail(val)}
          // isPassword
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponents
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />

        <RowComponents justify="space-between">
          <RowComponents onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponents text="Remember me" />
          </RowComponents>
          <ButtonComponents
            text="Forgot Password?"
            type="text"
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </RowComponents>
      </SectionComponents>

      <SpaceComponents height={16} />

      <SectionComponents>
        <ButtonComponents
          onPress={handleLogin}
          text="SIGN IN"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionComponents>

      <SocialLogin />

      <SectionComponents>
        <RowComponents justify="center">
          <TextComponents text="Don't have an account?  " />
          <ButtonComponents
            text="Sign up"
            type="link"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponents>
      </SectionComponents>
    </ContainerComponents>
  );
};

export default LoginScreen;
