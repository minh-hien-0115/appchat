import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Sms, ArrowRight } from 'iconsax-react-nativejs'
import { ContainerComponents, SectionComponents, TextComponents, SpaceComponents, InputComponents, ButtonComponents } from '../../components'
import { appColors } from '../../contants/appColors'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  return (
    <ContainerComponents isImagesBackgournd back>
      <SectionComponents>
        <TextComponents text='Resset Password' title />
        <TextComponents text='Please enter your email address to request a password reset'  />
        <SpaceComponents height={26} />
        <InputComponents value={email} onChange={val => setEmail(val)} affix={<Sms size={20} color={appColors.gray}/>} placeholder='abc@gmail.com' />
      </SectionComponents>
      <SectionComponents>
        <ButtonComponents text='Send' type='primary' icon={<ArrowRight size={20} color={appColors.white} />} iconFlex='right' />
      </SectionComponents>
    </ContainerComponents>
  )
}

export default ForgotPassword