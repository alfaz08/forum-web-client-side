import React from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { MdOutlineCardMembership } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import usePost from '../../hooks/usePost';
import useComment from '../../hooks/useComment';
import { FacebookShareButton } from 'react-share';

const CardDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [posts] = usePost();
  const { register, handleSubmit, reset } = useForm();

  const { data: comment = [],refetch } = useQuery({
    queryKey: ['comment', id],
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

  const { description, createdAt, commentCount, downVote, email, image, name, tag, title, upVote, _id } = selectedPost;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(createdAt));

  const postUrl = `${window.location.origin}/posts/${id}`;


  const onSubmit = async (data) => {
    if (user) {
      const commentList = {
        commentDes: data.description,
        postTitle: title,
        userEmail: user.email,
        postId: id,
      };

      try {
        const response = await axiosSecure.post('/comments', commentList);

        if (response.data.insertedId) {
          reset();
          refetch()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Comment added to the post',
            showConfirmButton: false,
            timer: 1500,
          });

          const postResponse = await axiosSecure.patch(`/posts/${id}`);
          console.log(postResponse.data);
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const handleUpVote = async (id) => {
    if (user) {
      try {
        const response = await axiosSecure.patch(`/posts/count/${id}`);

        if (response.data.modifiedCount) {
          reset();

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You liked the post',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const handleDownVote = async (id) => {
    if (user) {
      try {
        const response = await axiosSecure.patch(`/posts/down/${id}`);

        if (response.data.modifiedCount) {
          reset();

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You disliked the post',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 mt-4 gap-6">
        <div className="md:border md:border-teal-300">
          <img className="h-[250px] md:h-[500px] w-full" src={image} alt="" />
          <h2 className="text-center text-2xl font-bold">Author Name: {name}</h2>
        </div>

        <div>
          <h1 className="font-bold text-xl">Title: {title}</h1>
          <h2 className="font-semibold text-xl mt-4">Post Description: {description}</h2>

          <h2 className="font-bold text-xl mt-4 ">Tag: {tag}</h2>

          <h2 className="font-bold text-xl mt-4">Post Time: {formattedDate}</h2>

          <div className="flex gap-2 mt-4">
            <h2 className="mt-2 font-bold">Give your reaction on this post: </h2>

            {
              user?.email===email ?
              <button disabled onClick={() => handleUpVote(id)} className="btn btn-warning hover:bg-teal-300">
              <AiFillLike className="text-2xl " />
            </button>
            :
            <button onClick={() => handleUpVote(id)} className="btn btn-warning hover:bg-teal-300">
              <AiFillLike className="text-2xl " />
            </button>
            }

            {
              user?.email === email ?
              <button disabled onClick={() => handleDownVote(id)} className="btn ml-4 btn-warning hover:bg-teal-300">
              <AiFillDislike className=" text-2xl  " />
            </button>
            :
            <button onClick={() => handleDownVote(id)} className="btn ml-4 btn-warning hover:bg-teal-300">
              <AiFillDislike className=" text-2xl  " />
            </button>
            }
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
                {...register('description')}
                className="textarea textarea-bordered border-teal-400 h-24"
                placeholder="Please give your comment here"
              ></textarea>
              {
                user?.email === email ?
                <button disabled className="btn btn-warning hover:text-white hover:bg-black">Add Comment</button>
                :
                <button className="btn btn-warning hover:text-white hover:bg-black">Add Comment</button>
              }
            </div>
          </form>
        </div>
      </div>

      <div>
        <h2 className="font-bold">Recent Comment</h2>
        {comment.map((item) => (
          <div className="font-bold text-xl mb-4" key={item._id}>
            <p>{item.commentDes}</p>
            <h2>from ({item.userEmail})</h2>
          </div>
        ))}
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
  );
};

export default CardDetails;