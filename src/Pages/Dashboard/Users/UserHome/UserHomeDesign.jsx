import useAuth from "../../../../hooks/useAuth";
import useSinglePost from "../../../../hooks/useSinglePost";


const UserHomeDesign = ({item,post}) => {

const {email,badge,name} =item

const [singlePost] =useSinglePost()
console.log(singlePost);


const {user} = useAuth()
  return (
    <div>
      <img src={user?.photoURL} alt="" />
      <h2>{name}</h2>
      <h2>{email}</h2>
      <h2>{badge}</h2>

      {
        singlePost.map(post=><div key={post._id}>
          <h2>{post?.title}</h2>
         </div>
         
          )
      }
     
    </div>
  );
};

export default UserHomeDesign;