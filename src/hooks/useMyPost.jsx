

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyPost = () => {
  const axiosSecure =useAxiosSecure()
  const {user} =useAuth()
  const {data: myPost=[]}=useQuery({
    queryKey:['myPost',user?.email],
    queryFn:async()=>{
    const res =await axiosSecure.get(`/posts/my?email=${user?.email}`)
    return res.data
    }
  })
  return [myPost]
};

export default useMyPost;