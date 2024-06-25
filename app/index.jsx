import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto'
import * as LocalAuthentication from 'expo-local-authentication';
import { useGlobalContext } from '../context/GlobalProvider';
NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function App() {
  const {loading, isLoggedIn} = useGlobalContext()

  useEffect(() => {
    useFaceLock();
    return () => {
      console.log('unmounting')
    }
  }, [])
  
  useEffect(() => {
    if(isLoggedIn){
      router.push('/home')
    }
  }, [isLoggedIn])
  useFaceLock = async () => {
    
    // let res = await LocalAuthentication.authenticateAsync()
  }
  return (
    // <View className="flex-1 items-center justify-center bg-white">
    //   <Text className="text-3xl font-pblack">WE are LIVE!</Text>
    //   <StatusBar style="auto" />
    //   <Link href="/profile" > Go To Profile </Link>
    // </View>
    <SafeAreaView className="bg-primary h-full "> 
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full min-h-[85vh] justify-center items-center px-4">
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />
          <Image 
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />
          <View className="relative mt-5">
            <Text className="font-bold text-center text-3xl text-white">Discover Endless Possibilites with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image source={images.path} className="w-[76px] h-[15px] absolute bottom-[-5px] left-[230px]"/>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets technology. Aora is a platform that allows you to create, share and explore.
          </Text>
          <CustomButton
            title="Continue with email"
            handlePress={()=>router.push('/sign-in')}
            containerStyles="w-full mt-7"
            isLoading={loading}
          />
          
        </View>
      </ScrollView>
      < StatusBar  style='light'/>
    </SafeAreaView> 
  );
}
