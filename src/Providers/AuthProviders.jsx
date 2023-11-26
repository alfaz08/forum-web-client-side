import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic" 

export const AuthContext = createContext(null)


const AuthProviders = ({children}) => {

  const [user,setUser] =useState(null)
  const [loading,setLoading] =useState(true)
  const googleProvider = new GoogleAuthProvider()
  const axiosPublic =useAxiosPublic()


  const googleSignIn =()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }


  const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const updateUserProfile = (name,photo)=>{
    return updateProfile (auth.currentUser,{
      displayName:name,
     photoURL: photo,
    })
  }
 
  const signIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if(currentUser){
        const userInfo ={email:currentUser.email}
         axiosPublic.post('/jwt',userInfo)
         .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token',res.data.token)
          }
         })
      }
      else{
         localStorage.removeItem('access-token')
      }
      setLoading(false)
    }); 
    
    return ()=>{
      unsubscribe()
    }
   },[axiosPublic])
 

const logOut =()=>{
  setLoading(true)
    return signOut(auth)
   }


  const authInfo ={
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    logOut,
    googleSignIn
  }




  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProviders;