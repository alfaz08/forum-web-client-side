

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";


const useReported = () => {
  const axiosSecure =useAxiosSecure()

  const {data: reported=[],refetch}=useQuery({
    queryKey:['reported'],
    queryFn:async()=>{
    const res =await axiosSecure.get('/reports')
    return res.data
    }
  })
  return [reported,refetch]
};

export default useReported;