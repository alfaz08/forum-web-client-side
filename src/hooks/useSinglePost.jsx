

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useSinglePost = () => {
  const axiosSecure =useAxiosSecure()
  const {user} =useAuth()
  const {data: singlePost=[]}=useQuery({
    queryKey:['singlePost',user?.email],
    queryFn:async()=>{
    const res =await axiosSecure.get(`/posts/single?email=${user?.email}`)
    return res.data
    }
  })
  return [singlePost]
};

export default useSinglePost;