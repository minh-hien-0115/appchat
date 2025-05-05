import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponents, SectionComponents, SpaceComponents, TextComponents } from '../../../components'
import { appColors } from '../../../contants/appColors'
import { fontFamilies } from '../../../contants/fontFamilies'

const SocialLogin = () => {
  return (
    <SectionComponents>
      <TextComponents
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceComponents height={16} />
      {/* <ButtonComponents
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />
      <ButtonComponents
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Facebook />}
      /> */}
    </SectionComponents>
  )
}

export default SocialLogin