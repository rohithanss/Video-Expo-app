import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    getGetCurrentUser();
  }, []);

  const getGetCurrentUser = async () => {
    try {
      let currentUser = await getCurrentUser();
      if(currentUser){
        setUser(currentUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }finally{
      setLoading(false);
    }
  }
  return (
    <GlobalContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser, loading, setLoading}}>
      {children}
    </GlobalContext.Provider>
  );
}