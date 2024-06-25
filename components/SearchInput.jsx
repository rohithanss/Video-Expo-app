import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { usePathname } from 'expo-router'

const SearchInput = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
 
  const pathname = usePathname();
  const [query, setQuery] = useState('')
  return (
      <View className="flex-row w-full h-16 px-4 bg-black-100 border-2 justify-center border-black-200 rounded-2xl focus:border-secondary
      space-x-4 items-center">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor={'#7b7b8b'}
          className="text-base mt-0.5 text-white flex-1 font-pregular"
        />
        <TouchableOpacity>
          <Image 
            source={icons.search}
            className="w-5 h-5"
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

  )
}

export default SearchInput