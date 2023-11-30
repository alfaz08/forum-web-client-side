import useAuth from "../../../../hooks/useAuth";
import useSinglePost from "../../../../hooks/useSinglePost";
import { MdOutlineMail } from "react-icons/md";

import { FaAddressCard } from "react-icons/fa6";
import { MdCardMembership } from "react-icons/md";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const UserHomeDesign = ({item,post}) => {

const {email,badge,name} =item

const [singlePost] =useSinglePost()
console.log(singlePost);


const {user} = useAuth()
  return (
    <div>
       <SectionTitle
        heading="Profile"
        subHeading="Welcome to Your"
      ></SectionTitle>
     


      <div className="flex justify-center">
      <div className="card w-96 bg-base-100 ">
  <figure><img className="mt-4 w-96 h-96" src={user?.photoURL} alt="Shoes" /></figure>
  <div className="card-body grid justify-center">
    <h2 className="card-title"><FaAddressCard />
User Name: {name}</h2>
    <h2 className="card-title"><MdOutlineMail />
User Email: {email}</h2>
    <h2 className="card-title "><MdCardMembership />
Membership Status: {badge}</h2>
  </div>
</div>
      </div>

      {/* {
        singlePost.map(post=><div key={post._id}>
          <h2>{post?.title}</h2>
         </div>
         
          )
      } */}

 <h2 className="font-bold text-4xl grid justify-center  text-amber-400">Recent Post</h2>
<div className="overflow-x-auto">
<table className="table table-zebra">
  {/* head */}
  <thead>
    <tr>
    <th>#</th>
      <td>Title</td>
      <td>Number of Votes</td>
      <td>Number of Comment</td>
      <td>Post Time</td>
    </tr>
  </thead>
  <tbody>
   
    
   {
    singlePost.map((post,index)=>
      <tr key={post._id}>
      <th>{index+1}</th>
      <td>{post.title}</td>
      <td>{post.commentCount}</td>
      <td>
      {post.voteCount}
      </td>
      <td>
      {post.createdAt && (
        new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(new Date(post.createdAt))
      )}
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

export default UserHomeDesign;