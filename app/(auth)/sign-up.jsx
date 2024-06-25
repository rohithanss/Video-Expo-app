import { Text, View, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignUp = () => {
  const {setIsLoggedIn, setUser, isLoggedIn} = useGlobalContext()

  const [form, setForm] = useState({
    email:'',
    password: '',
    username: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit =async () => {
    if(!form.email || !form.password || !form.username) {
      Alert.alert('error', 'Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try{
      let res = await createUser(form.email, form.password, form.username);
      let currentUser = await getCurrentUser();
      if(currentUser){
        setUser(currentUser);
        setIsLoggedIn(true);
      }
      router.replace('/home');
      console.log(res, 'user created')
    }catch(e){
      console.log(e);
      Alert.alert('error', e.message);
      if(e.message.includes('session is active')){
        router.replace('/home');
      }
    }finally{
      setIsSubmitting(false)
    }
   
   
  }
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
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e)=>setForm({...form, username: e})}
            otherStyles="mt-10"
            placeholder={'Enter your username'}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e)=>setForm({...form, email: e})}
            otherStyles="mt-7"
            // keyboardType="email-address"
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
            title={'Sign up'}
            containerStyles={'mt-7'}
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-gray-100 text-lg font-pregular">Have an account already?</Text>
              <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Login</Link>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp
