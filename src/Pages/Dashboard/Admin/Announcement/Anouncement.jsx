import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Announcement = () => {
  const { register, handleSubmit ,reset} = useForm();
  const axiosSecure =useAxiosSecure()
  const {user} =useAuth()

 
    const onSubmit = async(data) => {
      const postItem ={
        title: data.title,
        description: data.description,
        email:user?.email
      }
      console.log(postItem);
      const menuRes =await axiosSecure.post('/announcements',postItem)
      console.log(menuRes.data);
      if(menuRes.data.insertedId){
        reset()
        //show success popup
        Swal.fire({
          position:"top-end",
          icon:"success",
          title:`${data.title} is added in the announcement!`,
          showConfirmButton:false,
          timer:1500
        })

      }
    
  }
  return (
    <div>
       <SectionTitle
        heading="Announcement"
        subHeading="Make Your Special"
      ></SectionTitle>

<form onSubmit={handleSubmit(onSubmit)} className="ml-2">
      

      <div className="form-control w-full ">
          <label className="label">
            <span className="label-text text-xl font-bold">Announcement Title</span>
          </label>
          <input
            type="text"
            placeholder="Announcement Title"
            {...register("title",{required:true})}
            required
            className="input border-amber-400 input-bordered w-full"
          />
        </div>


        <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-bold">Announcement Description</span>
        </label>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered border-amber-400 h-24"
          placeholder="Announcement Description"
        ></textarea>
      </div>



      
      <button className="btn mt-4 btn-warning hover:text-white hover:bg-black">
        Confirm Announcement
      </button>
    </form>
    </div>
  );
};

export default Announcement;