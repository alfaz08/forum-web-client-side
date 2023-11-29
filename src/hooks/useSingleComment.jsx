

  

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";


const useSingleComment= (postId) => {
  const axiosSecure =useAxiosSecure()

  const {data: singleComment=[]}=useQuery({
    queryKey:['singleComment'],
    queryFn:async()=>{
      const res = axiosSecure.get(`/comments/${postId}`)
    return res.data
    }
  })
  return [singleComment]
};

export default useSingleComment;