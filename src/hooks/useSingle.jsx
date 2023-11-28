import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useSingle = () => {
  const axiosSecure =useAxiosSecure()
  const {user} =useAuth()
  const {data: single=[]}=useQuery({
    queryKey:['single',user?.email],
    queryFn:async()=>{
    const res =await axiosSecure.get(`/users/single?email=${user?.email}`)
    return res.data
    }
  })
  return [single]
};

export default useSingle;