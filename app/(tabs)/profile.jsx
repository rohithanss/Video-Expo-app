import { StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { logout } from '../../lib/appwrite';
import { router } from 'expo-router';
import { useState } from 'react';
const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async ()=>{
    setIsSubmitting(true);
    console.log('submitting')
    try {
      await logout();
    } catch (error) {
      console.log(error, 'on logging out')
    }finally{
      router.replace('/sign-in');
      setIsSubmitting(false);
    }
  }
  return (
    <View>
      <Text>Profile</Text>
      <CustomButton isLoading={isSubmitting} title="Logout" handlePress={submit}/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})