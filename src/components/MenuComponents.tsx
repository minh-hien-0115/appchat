import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {ArrowRight2} from 'iconsax-react-nativejs';
import {appColors} from '../contants/appColors';
import {fontFamilies} from '../contants/fontFamilies';

interface Props {
  icon?: ReactNode;
  text: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  iconFlex?: 'left' | 'right';
  disable?: boolean;
}

const MenuComponents = ({
  icon,
  text,
  onPress,
  styles,
  textStyles,
  iconFlex = 'left',
  disable = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      style={[
        {
          backgroundColor: '#fff',
          paddingVertical: 14,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          justifyContent: 'space-between',
        },
        styles,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon && iconFlex === 'left' && <View style={{marginRight: 10}}>{icon}</View>}
        <Text
          style={[
            {
              fontSize: 16,
              color: '#000',
              fontFamily: fontFamilies.medium,
            },
            textStyles,
          ]}>
          {text}
        </Text>
      </View>
      <ArrowRight2 size={18} color="#aaa" />
    </TouchableOpacity>
  );
};

export default MenuComponents;