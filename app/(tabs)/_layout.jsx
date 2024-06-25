import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router'
import {icons} from '../../constants'
const TabIcon = ( {icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-4 h-4"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#cdcde0',
          tabBarStyle: {
            backgroundColor:'#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          }
        }}
      >
        <Tabs.Screen name='home' options={
          {
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused})=>(
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }
        }/>
        <Tabs.Screen name='bookmark' options={
          {
            title: 'bookmark',
            headerShown: false,
            tabBarIcon: ({color, focused})=>(
              <TabIcon 
                icon={icons.bookmark}
                color={color}
                name="bookmark"
                focused={focused}
              />
            )
          }
        }/>
        <Tabs.Screen name='create' options={
          {
            title: 'create',
            headerShown: false,
            tabBarIcon: ({color, focused})=>(
              <TabIcon 
                icon={icons.plus}
                color={color}
                name="create"
                focused={focused}
              />
            )
          }
        }/>
        <Tabs.Screen name='profile' options={
          {
            title: 'profile',
            headerShown: false,
            tabBarIcon: ({color, focused})=>(
              <TabIcon 
                icon={icons.profile}
                color={color}
                name="profile"
                focused={focused}
              />
            )
          }
        }/>
      </Tabs>
    </>
  )
}

export default TabLayout