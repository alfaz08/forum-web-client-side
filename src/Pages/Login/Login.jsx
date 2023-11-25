import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGooglePlusG } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import useAuth from "../../hooks/useAuth";


const Login = () => {

    const {signIn} =useAuth()
    const navigate = useNavigate()
    const location =useLocation()
    
  


  
 
    const handleLogin=e=>{
      e.preventDefault();
    const email =e.target.email.value;
    const password =e.target.password.value;
    // console.log(email,password);
    signIn(email,password)
    .then(res=>{console.log(res.user)
      navigate(location?.state?location.state:'/')
     }) 
     .catch(error=>{
      console.log(error)
      setLoginError(error.message)
      toast.error(error.message)
      e.target.reset()
     })
  
 
    }


    






  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:ml-36 ">
     <div className="hidden lg:block ">
       <img className="h-[530px] w-[420px] mt-32" src="https://i.ibb.co/Qkbj5bY/Screenshot-2023-10-18-115151.jpg" alt="" />
     </div>
     <div className="">
     <div className="hero">
  <div className="hero-content flex-col md:w-[700px] ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Welcome to our website and explore it</p>
    </div>
    <div className="card flex-shrink-0 w-full shadow-2xl bg-custom-color">
    <form onSubmit={handleLogin} className="card-body bg-teal-200">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-semibold">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-semibold">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
         
        </div>
        <div className="form-control mt-6">
        <button  className="btn border-black  bg-custom-color text-black hover:bg-black hover:text-white">Login</button>
        </div>
      </form>



      <p className="text-center mt-4 mb-4 ">
        <span className="text-xl font-semibold ">Don't have an account please</span>
        <Link to="/signUp"  className=" font-bold text-blue-600 text-xl hover:text-white"> Register</Link>
      </p>


      <div className="flex items-center justify-center">
     <hr className="mr-2 ml-4 w-36 border-black" />
      <span>or</span>
      <hr className="ml-2 mr-4 w-36 border-black"/>
     </div>
     <div className="text-center mb-4 mt-4 ">
      <button    className=" text-amber-400 font-bold btn border-black bg-custom-color hover:bg-black hover:text-white"><FaGooglePlusG  className=" text-red-600 text-2xl "></FaGooglePlusG>Login with google</button>
     </div>




    </div>
  </div>
</div>



     </div>
   
     <ToastContainer/>
 
    </div>
    </div>
  );
};

export default Login;