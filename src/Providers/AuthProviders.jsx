import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext, useState } from "react";
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
      disPlayName:name,
     photoURL: photo,
    })
  }
 
  const signIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }



  const authInfo ={
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn
  }


  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProviders;