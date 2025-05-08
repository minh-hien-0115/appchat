import {View, TextInput, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponents,
  ContainerComponents,
  RowComponents,
  SectionComponents,
  SpaceComponents,
  TextComponents,
} from '../../components';
import {appColors} from '../../contants/appColors';
import {fontFamilies} from '../../contants/fontFamilies';
import {ArrowRight} from 'iconsax-react-nativejs';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../api/authApi';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '../../styles/globalStyles';
import {LoadingModal} from '../../modals';

const VerificationScreen = ({navigation, route}: any) => {
  const {code, email, password, username} = route.params;

  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);
  const ref4 = useRef<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = ``;

    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;

    setCodeValues(data);
  };

  const handleResendVerification = async () => {
    setErrorMessage('');
    setCodeValues(['', '', '', '']);
    setNewCode('');

    const api = `/verification`;
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
      console.log(`Không thể gửi mã xác thực! ${error}`);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage('Mã không hợp lệ!!!');
      } else {
        setErrorMessage('');

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
    } else {
      setErrorMessage(
        'Mã xác thực đã hết thời gian, vui lòng gửi lại mã mới!!!',
      );
    }
  };

  const maskedEmail = email.replace(
    /^(.{4})(.*)(.{3})@/,
    (match: string, p1: string, p2: string, p3: string) =>
      `${p1}${'*'.repeat(p2.length)}${p3}`,
  );

  return (
    <ContainerComponents back isImagesBackgournd isScroll>
      <SectionComponents>
        <TextComponents text="Verification" title />
        <TextComponents
          text={`Chúng tôi đã gửi cho bạn mã xác thực trên ${maskedEmail}`}
        />
        <SpaceComponents height={26} />

        <RowComponents justify="space-around">
          <TextInput
            ref={ref1}
            value={codeValues[0]}
            keyboardType="number-pad"
            placeholder="-"
            style={styles.input}
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 0);
              if (val.length) {
                ref2.current.focus();
              }
            }}
          />
          <TextInput
            value={codeValues[1]}
            ref={ref2}
            keyboardType="number-pad"
            placeholder="-"
            style={styles.input}
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 1);
              if (val.length) {
                ref3.current.focus();
              } else {
                ref1.current.focus();
              }
            }}
          />
          <TextInput
            ref={ref3}
            value={codeValues[2]}
            keyboardType="number-pad"
            placeholder="-"
            style={styles.input}
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 2);
              if (val.length) {
                ref4.current.focus();
              } else {
                ref2.current.focus();
              }
            }}
          />
          <TextInput
            ref={ref4}
            value={codeValues[3]}
            keyboardType="number-pad"
            placeholder="-"
            style={styles.input}
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 3);
              if (!val.length) {
                ref3.current.focus();
              }
            }}
          />
        </RowComponents>
      </SectionComponents>

      <SectionComponents styles={{marginTop: 40}}>
        <ButtonComponents
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text="Tiếp tục"
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    newCode.length !== 4 ? appColors.gray : appColors.primary,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </SectionComponents>

      {errorMessage && (
        <SectionComponents>
          <TextComponents
            styles={{textAlign: 'center'}}
            text={errorMessage}
            color={appColors.error}
          />
        </SectionComponents>
      )}
      <SectionComponents>
        {limit > 0 ? (
          <RowComponents justify="center">
            <TextComponents text="Gửi lại mã xác thực sau  " flex={0} />
            <TextComponents
              text={`00:${limit}`}
              flex={0}
              color={appColors.link}
            />
          </RowComponents>
        ) : (
          <RowComponents justify="center">
            <ButtonComponents
              type="link"
              text="Gửi lại email xác minh"
              onPress={handleResendVerification}
            />
          </RowComponents>
        )}
      </SectionComponents>
      <LoadingModal visible={isLoading} />
    </ContainerComponents>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 24,
    borderColor: appColors.gray2,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});