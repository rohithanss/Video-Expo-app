import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import * as SecureStore from 'expo-secure-store';
export const config = {
  endpoint:'https://cloud.appwrite.io/v1',
  platform:'com.jsm.hans',
  projectId: '665585b40023d01fb47b',
  databaseId: '665586aa003d843c1162',
  userCollectionId: '665586d500313a0209a1',
  videoCollectionId:'665586f0001324fa8a35',
  storageId:'66558a560036f2afe2be'
}

// Init your React Native SDK
const client = new Client();

client
.setEndpoint(config.endpoint) // Your Appwrite Endpoint
.setProject(config.projectId) // Your project ID
.setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client)

export const createUser = async  (email, password, name) => {
  try{
    let newAccount = await account.create(ID.unique(), email, password, name);
    if(!newAccount) throw new Error('User not created');
    const avatarUrl = avatar.getInitials(name);
    // await logout();
    await signIn(email, password);
    const newUser = await database.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username: name,
      avatar: avatarUrl

    });
    return newUser;
  }catch(e){
    console.log(e);
    throw e;
  }
}

export  const signIn = async (email, password)=>{
  try{
    // await logout();
    const session = await account.createEmailPasswordSession(email, password);
    let saved = SecureStore.setItem('session', JSON.stringify(session), {});
    console.log(saved, 'saved')
    console.log(session, 'logged in')
    return session
  }catch(e){
    console.log(e);
    throw e;
  }
}

export const logout = async () => {
  try{
    let res = await account.deleteSession('current');
    let saved = SecureStore.getItem('session',);
    let saved1 = SecureStore.getItem('session1',);
    let saved2 = SecureStore.getItem('session2',);
    let deleted = SecureStore.deleteItemAsync('session',);

    console.log(res, 'logged out', saved, saved1, saved2, deleted)
  }catch(e){
    console.log(e, 'error logging out');
    throw e;
  }
}

export const getCurrentUser =  async ()=>{
  try{
    let user = await account.get();
    if(!user) throw new Error('User not found');
    let currentUser = await database.listDocuments(config.databaseId, config.userCollectionId,[Query.equal('accountId', user.$id)]);
    if(!currentUser) throw new Error('User not found');
    return currentUser.documents[0];
  }catch(e){
    console.log(e, 'this is error');
    throw e;
  }
} 

export const getAllPosts = async ()=>{
  try {
    const posts = await database.listDocuments(config.databaseId, config.videoCollectionId);
    if(!posts || !Array.isArray(posts.documents)) throw new Error('No posts found');
    console.log('all')
    return posts.documents;
  } catch (error) {
    throw error
  }
}
export const getLatestPosts = async ()=>{
  try {
    const posts = await database.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)]);
    if(!posts || !Array.isArray(posts.documents)) throw new Error('No posts found');
    console.log('lsted')
    return posts.documents;
  } catch (error) {
    throw error
  }
}