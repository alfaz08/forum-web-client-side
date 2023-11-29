import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AddTag = () => {
  const { register, handleSubmit ,reset} = useForm();
  const axiosSecure =useAxiosSecure()
  const {user} =useAuth()

  const onSubmit = async(data) => {
    const postItem ={
      tag:data.tag,
      email:user?.email
    }
    console.log(postItem);
    const menuRes =await axiosSecure.post('/tags',postItem)
      console.log(menuRes.data);
      if(menuRes.data.insertedId){
        reset()
        //show success popup
        Swal.fire({
          position:"top-end",
          icon:"success",
          title:`${data.tag} is added!`,
          showConfirmButton:false,
          timer:1500
        })

      }
  }
  return (
    <div>
       <SectionTitle
        heading="Add Tag"
        subHeading="Discuss More Topics"
      ></SectionTitle>

<form onSubmit={handleSubmit(onSubmit)} className="ml-2">
      

      <div className="form-control w-full ">
          <label className="label">
            <span className="label-text text-xl font-bold">Add a Tag</span>
          </label>
          <input
            type="text"
            placeholder="Add a Tag"
            {...register("tag",{required:true})}
            required
            className="input border-amber-400 input-bordered w-full"
          />
        </div>


     



      
      <button className="btn mt-4 btn-warning hover:text-white hover:bg-black">
        Add Tag
      </button>
    </form>


    </div>
  );
};

export default AddTag;