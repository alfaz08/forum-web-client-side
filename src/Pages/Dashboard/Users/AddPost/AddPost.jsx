import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserInfo from "../../../../hooks/useUserInfo";
import useMyPost from "../../../../hooks/useMyPost";
import { Link } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPost = () => {
  const { register, handleSubmit ,reset} = useForm();
  console.log('help');
  const normalizedUserInfo =useUserInfo()

 

  const [myPost] =useMyPost()
  console.log(myPost.length);


  const axiosPublic =useAxiosPublic()
  const axiosSecure = useAxiosSecure()

  const {user} =useAuth()

  const onSubmit = async(data) => {
   

    //image upload to imgbb and then get an url
    const imageFile ={image: data.image[0]}
    const res =await axiosPublic.post(image_hosting_api,imageFile,{
      headers:{
        'content-type': 'multipart/form-data'
      }
    })
    if(res.data.success){
      //now send the menu item data to the server with the image URL
      const postItem ={
        name: data.name,
        email: data.email,
        title: data.title,
        description: data.description,
        tag:data.tag,
        upVote: parseFloat(data.upVote),
        downVote: parseFloat(data.downVote),
        image: res.data.data.display_url,
        createdAt: new Date(),
        commentCount:0,
        voteCount:0
      }
      console.log(postItem);
      //
      const menuRes =await axiosSecure.post('/posts',postItem)
      console.log(menuRes.data);
      if(menuRes.data.insertedId){
        reset()
        //show success popup
        Swal.fire({
          position:"top-end",
          icon:"success",
          title:`${data.title} is added in the post!`,
          showConfirmButton:false,
          timer:1500
        })

      }
    }
    
  };



  return (
    <div>
      <h1 className="mt-2 text-center text-2xl font-bold">Add Your Post</h1>
      <div>
       
     {
      normalizedUserInfo?.badge==='bronze' && myPost.length ===5 
      ?
      
     
    <div className=" grid justify-center mt-12">
      <p className="text-4xl font-bold">You are not able to post more.For more post</p>
      <div className="grid justify-center mt-4">
      <Link to={'/membership'}>
     <button className="btn btn-warning text-xl  font-bold text-center  ">Become a Member</button>
      </Link>
      </div>
    </div>


      :

      <form onSubmit={handleSubmit(onSubmit)} className="ml-2">
      <div className="form-control w-full my-6">
        <label className="label">
          <span className="label-text text-xl font-bold">Name</span>
        </label>
        <input
          type="text"
          
          {...register("name",{required:true})}
          required
          className="input input-bordered border-amber-400 w-full"
        />
      </div>

      <div className="form-control w-full my-6">
        <label className="label">
          <span className="label-text text-xl font-bold">Email</span>
        </label>
        <input
          type="text"
          
          {...register("email",{required:true})}
          required
          className="input input-bordered border-amber-400 w-full"
        />
      </div>

      <div className="form-control w-full ">
          <label className="label">
            <span className="label-text text-xl font-bold">Post Title</span>
          </label>
          <input
            type="text"
            placeholder="Post Title"
            {...register("title",{required:true})}
            required
            className="input border-amber-400 input-bordered w-full"
          />
        </div>


        <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-bold">Post Description</span>
        </label>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered border-amber-400 h-24"
          placeholder="Post Description"
        ></textarea>
      </div>



      <div className="grid md:flex gap-6">
        {/* category */}
        <div className="form-control mt-6  ">
          <label className="label">
            <span className="label-text"></span>
          </label>
          <select 
            defaultValue="default"
            {...register("tag",{required:true})}
            required
            className="select select-bordered border-amber-400 w-full"
          >
            <option disabled value="default" >
              Select a Tag
            </option>
            <option value="technology ">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="programming">Programming</option>
            <option value="travel">Travel</option>
            <option value="Health">Health</option>
          </select>
        </div>

        {/* price */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-xl font-bold">Up Vote</span>
          </label>
          <input
            type="text"
            placeholder="upVote"
            {...register("upVote",{required:true})}
            required
            defaultValue="0"
           
            className="input input-bordered border-amber-400 w-full"
          />
        </div>

        <div className="form-control  ">
          <label className="label">
            <span className="label-text text-xl font-bold">Down Vote</span>
          </label>
          <input
            type="text"
            placeholder="downVote"
            defaultValue="0"
            {...register("downVote",{required:true})}
            required
         
            className="input input-bordered border-amber-400 w-full"
          />
        </div>




      </div>

     

      
      <div className="form-control w-full my-6">
        <input
        {...register("image",{required:true})}
        required
          type="file"
          className="file-input file-input-bordered file-input-warning w-full "
        />
      </div>
      <button className="btn btn-warning hover:text-white hover:bg-black">
        Add Post
      </button>
    </form>
     }

      </div>
    </div>
  );
};

export default AddPost;