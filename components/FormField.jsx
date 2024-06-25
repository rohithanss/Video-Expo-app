import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)
 
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row w-full h-16 px-4 bg-black-100 border-2 justify-center border-black-200 rounded-2xl focus:border-secondary">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor={'#7b7b8b'}
          className="flex-1 text-white font-psemibold text-base"
          secureTextEntry={title==='Password' && !showPassword}
        />
        {title==='Password' && (
          <TouchableOpacity
            onPress={()=>setShowPassword(!showPassword)}
            className="items-center"
          >
            <Image 
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6"
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField