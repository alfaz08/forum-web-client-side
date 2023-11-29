import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";


const ManageUsers = () => {
  const axiosSecure =useAxiosSecure()

  const {data: users=[],refetch} =useQuery({
    queryKey: ['users'],
    queryFn:async()=>{
      const res = await axiosSecure.get('/users')
      return res.data
    }
  })

 const handleMakeAdmin = user =>{
  console.log(user);
   axiosSecure.patch(`/users/admin/${user._id}`)
   .then(res=>{
    console.log(res.data);
    if(res.data.modifiedCount>0){
      refetch()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${user.name} is an Admin Now!`,
        showConfirmButton: false,
        timer: 500,
      });
    }
   })

 }


  return (
    <div>
      <SectionTitle
        heading="All Users"
        subHeading="Manage Your Own Way"
      ></SectionTitle>
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
          {
            user.role==='admin'? 'Admin' : 
            <button 
          onClick={()=>handleMakeAdmin(user)}
          className="btn btn-lg bg-amber-500 hover:text-white hover:bg-black">
          <FaUsers className="text-white text-2xl"></FaUsers>

          </button>
          }
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