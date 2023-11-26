import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";

const AddPost = () => {
  const { register, handleSubmit ,reset} = useForm();
  const {user} =useAuth()
  const onSubmit = async(data) => {

  }



  return (
    <div>
      <h1 className="mt-2 text-center">Add Your Post</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="ml-2">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Name</span>
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
              <span className="label-text">Email</span>
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
                <span className="label-text">Post Title</span>
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
              <span className="label-text">Post Description</span>
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
                {...register("category",{required:true})}
                required
                className="select select-bordered border-amber-400 w-full"
              >
                <option disabled value="default" >
                  Select a Tag
                </option>
                <option value="technology">Technology</option>
                <option value="entertainment">Entertainment</option>
                <option value="programming">Programming</option>
                <option value="travel">Travel</option>
                <option value="Health">Health</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Upvote</span>
              </label>
              <input
                type="text"
                placeholder="upVote"
                {...register("upVot",{required:true})}
                required
                defaultValue="0"
                disabled
                className="input input-bordered border-amber-400 w-full"
              />
            </div>

            <div className="form-control  ">
              <label className="label">
                <span className="label-text">Down Vote</span>
              </label>
              <input
                type="text"
                placeholder="downVote"
                defaultValue="0"
                {...register("downVote",{required:true})}
                required
                disabled
                className="input input-bordered border-amber-400 w-full"
              />
            </div>




          </div>

          {/* Recipe Details */}

          
          <div className="form-control w-full my-6">
            <input
            {...register("image",{required:true})}
            required
              type="file"
              className="file-input file-input-bordered file-input-warning w-full "
            />
          </div>
          <button className="btn btn-warning">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;