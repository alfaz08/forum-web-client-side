import { useNavigate, useParams } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { useForm } from "react-hook-form";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const CardDetails = () => {
  const { id } = useParams();
  console.log(id);
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  const navigate =useNavigate()
  console.log(user);
  const [posts] = usePost();
  const { register, handleSubmit ,reset} = useForm();
  // Find the post with the matching id
  const selectedPost = posts.find(post => post?._id === id);

  // Check if selectedPost is defined before destructuring
  if (!selectedPost) {
    return <div className="flex flex-col items-center justify-center">
    <div className="animate-spin h-14 w-14 border-t-4 border-teal-700 rounded-full border-r-4"></div>
    <span className="text-lg mt-4">Data Loading! Please Wait</span>
  </div>; // You can render a loading state or handle it in another way
  }

  // Destructure properties from selectedPost
  const { description,createdAt,commentCount, downVote, email, image, name, tag, title, upVote, _id } = selectedPost;
  
  const onSubmit = async (data) => {
    if (user) {
      const commentList = {
        commentDes: data.description,
        userEmail: user.email,
        postId: id,
      };
      console.log(commentList);
  

  

      try {
        const response =await axiosSecure.post('/comments', commentList);
        // Additional logic after successful POST request, if needed
        if(response.data.insertedId){
          reset()
          //show success popup
          Swal.fire({
            position:"top-end",
            icon:"success",
            title:"comment is added to the post",
            showConfirmButton:false,
            timer:1500
          })
           //comment count
          const postResponse = await axiosSecure.patch(`/posts/${id}`);
           console.log(postResponse.data);
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    } 
    else {
      navigate('/login');
    }
  };



 const handleUpVote = async (id)=>{
  console.log(id);
  if (user) {
    try {
      const response = await axiosSecure.patch(`/posts/count/${id}`);
      // Additional logic after successful POST request, if needed
      console.log(response);
      if(response.data.modifiedCount){
        reset()
        //show success popup
        Swal.fire({
          position:"top-end",
          icon:"success",
          title:"You liked the post",
          showConfirmButton:false,
          timer:1500
        })
        
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  } 
  else {
    navigate('/login');
  }
 }
 
 const handleDownVote = async (id)=>{
  if (user) {
    try {
      const response = await axiosSecure.patch(`/posts/down/${id}`);
      // Additional logic after successful POST request, if needed
      console.log(response);
      if(response.data.modifiedCount){
        reset()
        //show success popup
        Swal.fire({
          position:"top-end",
          icon:"success",
          title:"You disliked the post",
          showConfirmButton:false,
          timer:1500
        })
        
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  } 
  else {
    navigate('/login');
  }
 }


  return (
   <div className="max-w-7xl mx-auto">
     <div className="grid md:grid-cols-2 mt-4 gap-6">

<div className="md:border md:border-teal-300">
  <img className="h-[250px] md:h-[500px] w-full" src={image} alt="" />
  <h2 className="text-center text-2xl font-bold">Author Name:{name}</h2>
</div>

<div>
  <h1 className="font-bold text-xl">Title: {title}</h1>
  <h2 className="font-semibold text-xl mt-4">Post Description:{description}</h2>
 
   <h2 className="font-bold text-xl mt-4 ">Tag: {tag}</h2>

  
   
   <h2 className="font-bold text-xl mt-4">Post Time: {createdAt}</h2>
 
 
   <div className="flex gap-2 mt-4">
    <h2 className="mt-2 font-bold">Give your reaction on this  post: </h2>
    
    <button onClick={()=>handleUpVote(id)} className="btn btn-warning hover:bg-teal-300">

   <FaArrowAltCircleUp className="text-2xl "/>
   </button>

   <button onClick={()=>handleDownVote(id)} className="btn ml-4 btn-warning hover:bg-teal-300">
   <FaArrowAltCircleDown className=" text-2xl  " />
   </button>
  </div>



   <div className="bg-teal-300 flex justify-between items-center sm:w-[200px] md:w-[400px] h-[100px] rounded-lg mt-4">
    <div>
      <h2 className="ml-2 font-bold">Discuss your opinion <br />in our website</h2>
    </div>
    <div>
    <h2 className="mr-2 font-bold">Let's Give Your Comment</h2>
    </div>
   </div>





   <form onSubmit={handleSubmit(onSubmit)} className="ml-2">
   <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-bold"></span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered border-teal-400 h-24"
              placeholder="Please give your comment here"
            ></textarea>
             <button className="btn btn-warning hover:text-white hover:bg-black">
            Add Comment
          </button>
          </div>
   </form>
 
   
 
   <div>
    
   </div>
   
   

   <div>
    <div>

    </div>
    
  


   </div>
   
   
   
  
</div>

</div>
   </div>
  );
};

export default CardDetails;