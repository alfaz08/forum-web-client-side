import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/userAxiosSecure";


const ManageUsers = () => {
  const axiosSecure =useAxiosSecure()

  const {data: users=[]} =useQuery({
    queryKey: ['users'],
    queryFn:async()=>{
      const res = await axiosSecure.get('/users')
      return res.data
    }
  })

  return (
    <div>
      <div className="flex justify-evenly my-4">
      <h2>AllUsers</h2>
      <h2>Total Users: {users.length}</h2>
      </div>
    </div>
  );
};

export default ManageUsers;