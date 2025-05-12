import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ButtonComponents,
  RowComponents,
  SectionComponents,
  TextComponents,
} from '../../components';
import {fontFamilies} from '../../contants/fontFamilies';
import {ArrowRight, Message, Setting2, Strongbox, UserAdd} from 'iconsax-react-nativejs';
import {appColors} from '../../contants/appColors';
import MenuComponents from '../../components/MenuComponents';

const MenuScreen = () => {
  return (
    <ScrollView style={{flex: 1, marginTop: 50}}>
      <SectionComponents>
        <RowComponents justify="space-between">
          <TextComponents text="Menu" font={fontFamilies.bold} size={25} />
          <Text>QR</Text>
        </RowComponents>
      </SectionComponents>

      <SectionComponents>
        <MenuComponents
          icon={<Setting2 size={22} color="black" />}
          text="Cài đặt"
          onPress={() => console.log('Cài đặt')}
        />
      </SectionComponents>

      <SectionComponents>
        <MenuComponents
          icon={<Message size={22} color="black" />}
          text="Tin nhắn chờ"
          onPress={() => console.log('Tin nhắn chờ')}
        />
        
      </SectionComponents>

      <SectionComponents>
        <MenuComponents
          icon={<Strongbox size={22} color="black" />}
          text="Kho lưu trữ"
          onPress={() => console.log('Kho lưu trữ')}
        />
      </SectionComponents>

      <SectionComponents>
        <MenuComponents
          icon={<UserAdd size={22} color="black" />}
          text="Lời mời kết bạn"
          onPress={() => console.log('Lời mời kết bạn')}
        />
      </SectionComponents>
    </ScrollView>
  );
};

export default MenuScreen;
