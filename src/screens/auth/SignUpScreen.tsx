import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../api/authApi';
import { Validate } from '../../utils/Validate';

const initvalue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initvalue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if ( values.username|| values.email || values.password || values.confirmPassword) {
      setErrorMessage('');
    }
  }, [values.username, values.email, values.password, values.confirmPassword]);

  const handleChangeValues = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const handleRegister = async () => {
    const {username, email, password, confirmPassword} = values;

    const emailValidation = Validate.email(email);
    const passValidation = Validate.password(password);
    const confirmValidation = password === confirmPassword;

    if (email && password && confirmPassword) {
      setErrorMessage('');
      setIsLoading(true);
      if (!emailValidation) {
        setIsLoading(false);
        return setErrorMessage('Địa chỉ Email không hợp lệ, !');
      }
      if (!passValidation) {
        setIsLoading(false);
        return setErrorMessage(
          'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!',
        );
      }
      if (!confirmValidation) {
        setIsLoading(false);
        return setErrorMessage('Mật khẩu xác nhận không khớp!');
      }
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/register',
          values,
          'post',
        );

        console.log('Đăng ký thành công:', res);

        // if (res?.status === 200 || res?.success) {
        //   // Hiển thị LoadingModal trong 1.5 giây rồi chuyển màn hình
        //   setTimeout(() => {
        //     setIsLoading(false);
        //     navigation.replace('HomeScreen');
        //   }, 1500);
        // } else {
        //   setIsLoading(false);
        //   setErrorMessage(res?.message || 'Đăng ký thất bại!');
        // }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMessage('Có lỗi xảy ra khi đăng ký!');
      }
    } else {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
    }
  };

  return (
    <>
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
            placeholder="abc@gmail.com"
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

        {errorMessage && (
          <SectionComponents styles={{alignItems: 'center'}}>
            <TextComponents text={errorMessage} color={appColors.error} />
          </SectionComponents>
        )}

        <SpaceComponents height={16} />

        <SectionComponents>
          <ButtonComponents
            onPress={handleRegister}
            text="SIGN UP"
            type="primary"
            icon={<ArrowRight size={20} color={appColors.white} />}
            iconFlex="right"
          />
        </SectionComponents>

        <SocialLogin />

        <SectionComponents>
          <RowComponents justify="center">
            <TextComponents text="Already have an account?  " />
            <ButtonComponents
              type="link"
              text="Sign in"
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </RowComponents>
        </SectionComponents>
      </ContainerComponents>

      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;