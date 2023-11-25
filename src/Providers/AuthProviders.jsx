import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";


export const AuthContext = createContext(null)


const AuthProviders = ({children}) => {

  const [user,setUser] =useState(null)
  const [loading,setLoading] =useState(true)


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
    return signInWithEmailAndPassword(auth,email,password)
  }


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    }); 
    
    return ()=>{
      unsubscribe()
    }
   },[])
 

const logOut =()=>{
    return signOut(auth)
   }


  const authInfo ={
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    logOut
  }




  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProviders;