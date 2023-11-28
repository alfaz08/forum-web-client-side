import useMyPost from "../../../../hooks/useMyPost";


const MyPost = () => {
  const [myPost] = useMyPost()
  console.log(myPost);
  return (
    <div>
    <div className="flex justify-evenly my-4">
    <h2>MyPost: {myPost.length}</h2>
    
    </div>
    <div className="overflow-x-auto">
<table className="table table-zebra">
  {/* head */}
  <thead>
    <tr>
    <th>#</th>
      <td>Title</td>
      <td>Number of Votes</td>
      <td>Make Admin</td>
      <td>Subscription Status</td>
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
       <button className="btn btn-warning">All Comment</button>
      </td>
      <td>
      <button className="btn btn-warning">Delete</button>
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