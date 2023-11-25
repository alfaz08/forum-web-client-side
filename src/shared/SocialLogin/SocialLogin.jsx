import { FaGoogle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const {googleSignIn} =useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate =useNavigate()
  const handleGoogleSignIn = ()=>{
     googleSignIn()
     .then(result=>{
      console.log(result.user)
      const userInfo ={
        email: result.user?.email,
        name: result.user?.displayName,
          badge: 'bronze',
      }
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        console.log(res.data);
        navigate('/ ')
      })
     })
  }
  return (
    <div >
      <div className="flex items-center justify-center">
      <hr className="mr-2 ml-4 w-36 border-black" />
       <span className="text-2xl">or</span>
       <hr className="ml-2 mr-4 w-36 border-black"/>
      </div>
       
      <div className="text-center mb-4 mt-4 ">
        <button onClick={handleGoogleSignIn}  className=" text-red-600 font-bold btn border-black bg-custom-color hover:bg-black hover:text-white">
          <FaGoogle className="mr-2"></FaGoogle>
          Login With Google
        </button>
      </div>
    </div>
  );
};
export default SocialLogin;