

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";


const useAnnounce = () => {
  const axiosSecure =useAxiosSecure()

  const {data: announcement=[]}=useQuery({
    queryKey:['announcement'],
    queryFn:async()=>{
    const res =await axiosSecure.get('/announcements')
    return res.data
    }
  })
  return [announcement]
};

export default useAnnounce;