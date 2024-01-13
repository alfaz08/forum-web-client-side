import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdOutlineCardMembership } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";


import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import usePost from "../../hooks/usePost";
import useComment from "../../hooks/useComment";
import { FacebookShareButton } from "react-share";
import './card.css'
import { FaComments } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import { GrUserManager } from "react-icons/gr";
import { IoMdPricetag } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const CardDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [posts] = usePost();
  const { register, handleSubmit, reset } = useForm();

  const { data: comment = [], refetch } = useQuery({
    queryKey: ["comment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/post?postId=${id}`);
      return res.data;
    },
  });

  const selectedPost = posts.find((post) => post?._id === id);

  if (!selectedPost) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin h-14 w-14 border-t-4 border-teal-700 rounded-full border-r-4"></div>
        <span className="text-lg mt-4">Data Loading! Please Wait</span>
      </div>
    );
  }

  const {
    description,
    createdAt,
    commentCount,
    downVote,
    email,
    image,
    name,
    tag,
    title,
    upVote,
    _id,
  } = selectedPost;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    
  }).format(new Date(createdAt));

  const postUrl = `${window.location.origin}/posts/${id}`;

  const onSubmit = async (data) => {
    if (user) {
      const commentList = {
        commentDes: data.description,
        postTitle: title,
        userEmail: user.email,
        postId: id,
        createdAt:new Date(),
        name:user?.displayName,
        
      };

      try {
        const response = await axiosSecure.post("/comments", commentList);

        if (response.data.insertedId) {
          reset();
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Comment added to the post",
            showConfirmButton: false,
            timer: 1500,
          });

          const postResponse = await axiosSecure.patch(`/posts/${id}`);
          console.log(postResponse.data);
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleUpVote = async (id) => {
    if (user) {
      try {
        const response = await axiosSecure.patch(`/posts/count/${id}`);

        if (response.data.modifiedCount) {
          reset();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You liked the post",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleDownVote = async (id) => {
    if (user) {
      try {
        const response = await axiosSecure.patch(`/posts/down/${id}`);

        if (response.data.modifiedCount) {
          reset();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You disliked the post",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="">
      <div className="relative  md:border md:border-teal-300">
      <img className="h-[250px] md:h-[500px] w-full" src={image} alt="" />
  <div className="absolute bottom-0 left-0 flex bg-amber-300 gap-5 p-2">
    <div className="flex font-bold text-lg gap-1">
    <IoMdPricetag className="mt-2"/> {tag}
    </div>
    <div className="flex font-bold text-lg gap-1">
    <LuCalendarClock className="mt-2"/>{formattedDate}
    </div>
    <div className="flex font-bold text-lg gap-1">
    <FaComments className="mt-1"/>{commentCount}
    </div>
   <div className="flex font-bold text-lg gap-1">
   <CgProfile className="mt-1"/>{name}
   </div>
  
  </div>
</div>

        
        <div>
          <h1 className="font-bold text-4xl p-4 "> {title}</h1>
          <h2 className=" text-xl mt-2 p-4">
            {description}
          </h2>




      <div className="flex gap-4">
      


      <div className="flex gap-2 mt-4">
            <h2 className="mt-2 font-bold ">
              React on this post:{" "}
            </h2>

            {user?.email === email ? (
              <button
                disabled
                onClick={() => handleUpVote(id)}
                className="btn btn-warning hover:bg-teal-300"
              >
                <AiFillLike className="text-2xl " />
              </button>
            ) : (
              <button
                onClick={() => handleUpVote(id)}
                className="btn btn-warning hover:bg-teal-300"
              >
                <AiFillLike className="text-2xl " />
              </button>
            )}

            {user?.email === email ? (
              <button
                disabled
                onClick={() => handleDownVote(id)}
                className="btn ml-4 btn-warning hover:bg-teal-300"
              >
                <AiFillDislike className=" text-2xl  " />
              </button>
            ) : (
              <button
                onClick={() => handleDownVote(id)}
                className="btn ml-4 btn-warning hover:bg-teal-300"
              >
                <AiFillDislike className=" text-2xl  " />
              </button>
            )}
          </div>

          <div className="flex gap-2 mt-4">
        <h2 className="mt-2 font-bold">Share on Facebook:</h2>
        <FacebookShareButton url={postUrl}>
          <button className="btn btn-warning hover:bg-teal-300">
            <FaFacebook className="text-2xl" />
          </button>
        </FacebookShareButton>
      </div>

      </div>
         

         

        
         <div className="">
         <h2 className="font-bold ">Leave a comment</h2>
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
              {user?.email === email ? (
                <button
                  disabled
                  className="btn btn-warning hover:text-white hover:bg-black"
                >
                  Post Comment
                </button>
              ) : (
                <button className="btn mt-2 btn-warning hover:text-white hover:bg-black">
                 Post Comment
                </button>
              )}
            </div>
          </form>
         </div>
        </div>
      </div>

      <div>
  <h2 className="font-bold mt-4 text-xl mb-4">Recent Comments</h2>
  {
    comment.length<1?
   <div className="font-bold text-xl">No Comment Yet</div> :
    comment
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting comments by createdAt in descending order
    .map((item) => (
      <div className="mb-2 flex gap-4 bg-gray-200 p-2" key={item._id}>
        <div>
          <CgProfile className="text-4xl mt-2 text-teal-600" />
        </div>
        <div className="flex gap-10">
          <div >
          <p className="text-xl">{item.commentDes}</p>
          <h2>{item.name}</h2>
          </div>
          <div>
          <p className="mt-4 ">{new Date(item.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
          </div>
        </div>
      </div>
    ))
  }
</div>

      
    </div>
  );
};

export default CardDetails;
