import {ArrowRight, Lock, Sms} from 'iconsax-react-nativejs';
import React, {useState} from 'react';
import {Image, Switch, View} from 'react-native';
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

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);

  const handleLogin = async () => {
    const api = 'http://192.168.1.6:3001/hello';

    try {
      const res = await authenticationAPI.HandleAuthentication('/hello');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

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
          <ButtonComponents text="Forgot Password?" type='text' onPress={() => navigation.navigate('ForgotPassword')}/>
        </RowComponents>
      </SectionComponents>

      <SpaceComponents height={16} />

      <SectionComponents>
        <ButtonComponents onPress={handleLogin} text='SIGN IN' type='primary' icon={<ArrowRight size={20} color={appColors.white} />} iconFlex='right' />
      </SectionComponents>

      <SocialLogin />

      <SectionComponents>
        <RowComponents justify='center'>
          <TextComponents text="Don't have an account?  " />
          <ButtonComponents text="Sign up" type='link' onPress={() => navigation.navigate('SignUpScreen')} />
        </RowComponents>
      </SectionComponents>

    </ContainerComponents>
  );
};

export default LoginScreen;
