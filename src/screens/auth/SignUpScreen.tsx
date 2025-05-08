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
import {Validate} from '../../utils/Validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ErrorMessage {
  email: string;
  password: string;
  confirmPassword: string;
}

const initvalue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initvalue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);

  const handleChangeValues = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const formValidator = (key: string) => {
    const data = {...errorMessage};
    let message = ``;

    switch (key) {
      case 'email':
        if (!values.email) {
          message = `Email is required!!!`;
        } else if (!Validate.email(values.email)) {
          message = 'Email is not invalid!!';
        } else {
          message = '';
        }

        break;

      case 'password':
        message = !values.password ? `Password is required!!!` : '';
        break;

      case 'confirmPassword':
        if (!values.confirmPassword) {
          message = `Please type confirm password!!`;
        } else if (values.confirmPassword !== values.password) {
          message = 'Password is not match!!!';
        } else {
          message = '';
        }

        break;
    }

    data[`${key}`] = message;

    setErrorMessage(data);
  };

  const handleRegister = async () => {
    const api = '/verification';
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post',
      );

      navigation.navigate('VerificationScreen', {
        code: res.data.code,
        ...values,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // const {username, email, password, confirmPassword} = values;

  // const emailValidation = Validate.email(email);
  // const passValidation = Validate.password(password);
  // const confirmValidation = password === confirmPassword;

  // if (email && password && confirmPassword) {
  //   setErrorMessage('');
  //   setIsLoading(true);
  //   if (!emailValidation) {
  //     setIsLoading(false);
  //     setErrorMessage('Địa chỉ Email không hợp lệ, !');
  //   }
  //   if (!passValidation) {
  //     setIsLoading(false);
  //     setErrorMessage(
  //       'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!',
  //     );
  //   }
  //   if (!confirmValidation) {
  //     setIsLoading(false);
  //     setErrorMessage('Mật khẩu xác nhận không khớp!');
  //   }

  //   try {
  //     const res = await authenticationAPI.HandleAuthentication(
  //       '/register',
  //       {username, email, password},
  //       'post',
  //     );

  //     dispatch(addAuth(res.data))
  //     await AsyncStorage.setItem('auth', JSON.stringify(res.data))
  //     setIsLoading(false);

  //     if (res?.status === 200 || res?.data?.success) {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //         navigation.replace('HomeScreen');
  //       }, 2000);
  //     } else {
  //       setIsLoading(true);
  //       setErrorMessage(res?.data?.message || 'Đăng ký thất bại!');
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     setErrorMessage('Có lỗi xảy ra khi đăng ký!');
  //   }
  // } else {
  //   setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
  // }
  // };

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
            onEnd={() => formValidator('email')}
          />

          <InputComponents
            value={values.password}
            placeholder="Password"
            onChange={val => handleChangeValues('password', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('password')}
          />

          <InputComponents
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={val => handleChangeValues('confirmPassword', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('confirmPassword')}
          />
        </SectionComponents>

        {/* {errorMessage && (
          <SectionComponents styles={{alignItems: 'center'}}>
            <TextComponents text={errorMessage} color={appColors.error} />
          </SectionComponents>
        )} */}

        {errorMessage && (
          <SectionComponents>
            {Object.keys(errorMessage).map(
              (error, index) =>
                errorMessage[`${error}`] && (
                  <TextComponents
                    text={errorMessage[`${error}`]}
                    key={`error${index}`}
                    color={appColors.error}
                  />
                ),
            )}
          </SectionComponents>
        )}

        <SpaceComponents height={16} />

        <SectionComponents>
          <ButtonComponents
            disable={isDisable}
            onPress={handleRegister}
            text="Đăng ký"
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
