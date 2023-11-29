

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";


const useTag = () => {
  const axiosSecure =useAxiosSecure()

  const {data: tag=[]}=useQuery({
    queryKey:['tag'],
    queryFn:async()=>{
    const res =await axiosSecure.get('/tags')
    return res.data
    }
  })
  return [tag]
};

export default useTag;