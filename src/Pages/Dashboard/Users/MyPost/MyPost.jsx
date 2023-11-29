import { Link } from "react-router-dom";
import useMyPost from "../../../../hooks/useMyPost";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaCommentDots } from "react-icons/fa6";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const MyPost = () => {
  const [myPost,refetch] = useMyPost()
  console.log(myPost);
  const axiosSecure =useAxiosSecure()
const handleDelete =(id)=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result)=>{
    if(result.isConfirmed){
      axiosSecure.delete(`/posts/${id}`)
      .then(res=>{
        if(res.data.deletedCount>0){
          refetch()
          Swal.fire({
            title:"Deleted",
            text:"Your post has been deleted",
            icon:"success"
          })
        }
      })
    }
  })
}


  return (
    <div>
    <div className="flex justify-evenly my-4">
    <SectionTitle
        heading="My Post"
        subHeading="See What comment others?"
      ></SectionTitle>
    
    </div>
    <div className="overflow-x-auto">
<table className="table table-zebra">
  {/* head */}
  <thead>
    <tr>
    <th>#</th>
      <td>Title</td>
      <td>Number of Votes</td>
      <td>All Comment</td>
      <td>Delete Post</td>
    </tr>
  </thead>
  <tbody>
   
    
   {
    myPost.map((post,index)=>
      <tr key={post._id}>
      <th>{index+1}</th>
      <td>{post.title}</td>
      <td>{post.voteCount}</td>
      <td>
       <Link to={`comments/${post._id}`}>
       <button className="btn btn-warning"><FaCommentDots />
       </button>
       </Link>
      </td>
      <td>
      <button 
      onClick={()=>handleDelete(post._id)}
      className="btn bg-warning ">
        <FaTrashAlt className=""> </FaTrashAlt>
      </button>
      </td>
    </tr>
      )
  }
    
  </tbody>
</table>
</div>
  </div>
  );
};

export default MyPost;