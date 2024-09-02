import { Text, View, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import * as SecureStore from 'expo-secure-store';

const SignIn = () => {
  const {setIsLoggedIn, setUser, isLoggedIn} = useGlobalContext()

  const [session, setSession] = useState('default');
  const [session2, setSession2] = useState('default2');

  const [form, setForm] = useState({
    email:'',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit =async () => {
    if(!form.email || !form.password) {
      Alert.alert('error', 'Please fill in all fields');
      return;
    }
    setIsSubmitting(true)
    try {
      await signIn(form.email, form.password);
      let currentUser = await getCurrentUser();
      if(currentUser){
        setUser(currentUser);
        setIsLoggedIn(true);
      }
      router.replace('/home');
    } catch (error) {
      console.log(error, 'error')
      if(error.message.includes('session is active')){
        router.replace('/home');
      }else{
        Alert.alert('error', error.message);
      }
    }finally{
      setIsSubmitting(false)
    }

  }

  const fetchData = ()=>{
    let saved1 = SecureStore.getItem('session1');
    let s = SecureStore.setItem('session1', 'session 1');
    let saved2 = SecureStore.getItem('session2');
    if(saved1) setSession(saved1);
    if(saved2) setSession2(saved2);
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center  min-h-[81vh]  px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            {session} to {session2}
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e)=>setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder={'Enter your email'}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e)=>setForm({...form, password: e})}
            otherStyles="mt-7"
            placeholder={'Enter your password'}
          />
          <CustomButton 
            title={'Log in'}
            containerStyles={'mt-7'}
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-gray-100 text-lg font-pregular">Don't have an account?</Text>
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn
