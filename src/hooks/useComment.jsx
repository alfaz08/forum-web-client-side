import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useComment = (postId) => {
  const axiosSecure =useAxiosSecure()
 
  const {data: comment=[]}=useQuery({
    queryKey:['comment',postId],
    queryFn:async()=>{
      const res = await axiosSecure.get(`/comments/single?postId=${postId}`);
    return res.data
    }
  })
  
  return [comment]
};

export default useComment;