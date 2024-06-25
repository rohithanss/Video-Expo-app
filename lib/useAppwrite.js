import { useState, useEffect } from 'react'

const useAppwrite = (fn) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getData();
  
    return () => {
     
    }
  }, [])
  
  const getData = async () => {
    try {
      setIsLoading(true);
      let posts = await fn();
      if(posts){
        setData(posts);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occured while fetching data');

    }finally{
      setIsLoading(false);
    }
  }

  const reFetch = async ()=>{
    getData();
  }
  return {data, isLoading, reFetch};
}
export default useAppwrite