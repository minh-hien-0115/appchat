import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Sms, ArrowRight} from 'iconsax-react-nativejs';
import {
  ContainerComponents,
  SectionComponents,
  TextComponents,
  SpaceComponents,
  InputComponents,
  ButtonComponents,
} from '../../components';
import {appColors} from '../../contants/appColors';
import {Validate} from '../../utils/Validate';
import authenticationAPI from '../../api/authApi';
import {LoadingModal} from '../../modals';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleCheckEmail();
  }, [email]);
  
  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassword = async () => {
    const api = '/forgotPassword';
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      console.log(res);
      Alert.alert(
        'Thông báo',
        'Một mật khẩu mới được gửi tới email của bạn!!!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('LoginScreen');
            },
          },
        ],
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`Không thể tạo mật khẩu mới, ${error}`);
    }
  };

  return (
    <ContainerComponents isImagesBackgournd back>
      <SectionComponents>
        <TextComponents text="Resset Password" title />
        <TextComponents text="Please enter your email address to request a password reset" />
        <SpaceComponents height={26} />
        <InputComponents
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={20} color={appColors.gray} />}
          placeholder="abc@gmail.com"
          onEnd={handleCheckEmail}
        />
      </SectionComponents>
      <SectionComponents>
        <ButtonComponents
          onPress={handleForgotPassword}
          disable={isDisable}
          text="Send"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionComponents>
      <LoadingModal visible={isLoading} />
    </ContainerComponents>
  );
};

export default ForgotPassword;