import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useComment from "../../../../hooks/useComment";
import { useParams } from "react-router-dom";



const CommentDetails = () => {
  const {id} =useParams()
  console.log(id);
  const axiosSecure =useAxiosSecure()
 
  const { data: comment = [] } = useQuery({
    queryKey: ['comment', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/single?postId=${id}`);
      return res.data;
    },
  });

  
 
  console.log(comment);
  return (
    <div>
      {comment.length}
    </div>
  );
};

export default CommentDetails;