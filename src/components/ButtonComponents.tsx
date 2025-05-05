import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponents from './TextComponents';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../contants/appColors';
import { fontFamilies } from '../contants/fontFamilies';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  textFont?: string;
}
const ButtonComponents = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyles,
    onPress,
    iconFlex,
    textFont,
  } = props;
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,
        {backgroundColor: color ?? appColors.primary, marginBottom: 17, width: '95%'},
        styles,
      ]}>
      {icon && iconFlex === 'left' && icon}
      <TextComponents
        text={text}
        color={textColor ?? appColors.white}
        styles={[textStyles, {marginLeft: icon ? 12 : 0, fontSize: 16, textAlign: 'center'}, ]}
        flex={icon && iconFlex === 'right' ? 1 : 0}
        font={textFont ?? fontFamilies.medium}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponents text={text} color={type === 'link' ? appColors.primary : appColors.text} />
    </TouchableOpacity>
  );
};

export default ButtonComponents;
