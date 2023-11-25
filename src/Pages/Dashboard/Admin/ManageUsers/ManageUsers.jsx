import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/userAxiosSecure";
import { FaUsers } from "react-icons/fa6";


const ManageUsers = () => {
  const axiosSecure =useAxiosSecure()

  const {data: users=[]} =useQuery({
    queryKey: ['users'],
    queryFn:async()=>{
      const res = await axiosSecure.get('/users')
      return res.data
    }
  })

 const handleMakeAdmin = data=>{

 }


  return (
    <div>
      <div className="flex justify-evenly my-4">
      <h2>AllUsers</h2>
      <h2>Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
      <th>#</th>
        <td>Name</td>
        <td>Email</td>
        <td>Make Admin</td>
        <td>Subscription Status</td>
      </tr>
    </thead>
    <tbody>
     
      
     {
      users.map((user,index)=>
        <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button 
          onClick={()=>handleMakeAdmin(user)}
          className="btn btn-lg bg-amber-500 hover:text-white hover:bg-black">
          <FaUsers className="text-white text-2xl"></FaUsers>

          </button>
        </td>
        <td>{user.badge}</td>
      </tr>
        )
    }
      
    </tbody>
  </table>
</div>
    </div>
  );
};

export default ManageUsers;