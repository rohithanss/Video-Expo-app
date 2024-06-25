import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { useState, useEffect } from 'react'
import { getAllPosts, getLatestPosts, logout } from '../../lib/appwrite';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const {user} = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {data:posts, reFetch, isLoading} = useAppwrite(getAllPosts);
  const {data: latestPosts, reFetch: refetchLatestPosts, isLoading: latestPostsLoading} = useAppwrite(getLatestPosts);
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



  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await reFetch()
    await refetchLatestPosts()
    setRefreshing(false);
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
            <VideoCard video={item}/>
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back,
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {user.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>

            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-200 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending
                posts={latestPosts ?? []}
              />
              
            </View>
          </View>)}
        ListEmptyComponent={()=>(
          <EmptyState 
            title="No videos found"
            description="Be the first one to upload a video."
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>   
  )
}

export default Home