import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponents,
  ContainerComponents,
  InputComponents,
  RowComponents,
  SectionComponents,
  SpaceComponents,
  TextComponents,
} from '../../components';
import SocialLogin from './Component/SocialLogin';
import {appColors} from '../../contants/appColors';
import {ArrowRight, Lock, Sms, User} from 'iconsax-react-nativejs';

const initvalue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initvalue);
  const handleChangeValues = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  return (
    <ContainerComponents isImagesBackgournd isScroll back>
      <SectionComponents>
        <TextComponents size={24} title text="Sign up" />

        <SpaceComponents height={21} />

        <InputComponents
          value={values.username}
          placeholder="Username"
          onChange={val => handleChangeValues('username', val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />

        <InputComponents
          value={values.email}
          placeholder="Email"
          onChange={val => handleChangeValues('email', val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />

        <InputComponents
          value={values.password}
          placeholder="Password"
          onChange={val => handleChangeValues('password', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />

        <InputComponents
          value={values.confirmPassword}
          placeholder="Confirm Password"
          onChange={val => handleChangeValues('confirmPassword', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
      </SectionComponents>

      <SpaceComponents height={16} />

      <SectionComponents>
        <ButtonComponents type="primary" text="SIGN UP" icon={<ArrowRight size={20} color={appColors.white} />} iconFlex='right'/>
      </SectionComponents>

      <SocialLogin />

      <SectionComponents>
        <RowComponents justify="center">
          <TextComponents text="Don't have an account?  " />
          <ButtonComponents
            type="link"
            text="Sign in"
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </RowComponents>
      </SectionComponents>
    </ContainerComponents>
  );
};

export default SignUpScreen;
