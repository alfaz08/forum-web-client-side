import { MdPendingActions } from "react-icons/md";

import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useReported from "../../../../hooks/useReported";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ReportComment = () => {
  const [reported,refetch] =useReported()
  console.log('reported',reported);
  const axiosSecure =useAxiosSecure()

  const handleDelete =(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result)=>{
      if(result.isConfirmed){
        axiosSecure.delete(`/reports/${id}`)
        .then(res=>{
          if(res.data.deletedCount>0){
            refetch()
            Swal.fire({
              title:"Deleted",
              text:"Comment has been deleted",
              icon:"success"
            })
          }
        })
      }
    })
  } 


  return (
    <div>
       <SectionTitle
        heading="Reported Comments"
        subHeading="Take some actions"
      ></SectionTitle>
 <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
      <th>#</th>
        <td>Id Post</td>
        <td>Reported Email</td>
        <td>Reported Comment</td>
        <td>Take Action</td>
        
      </tr>
    </thead>
    <tbody>
     
      
     {
      reported.map((user,index)=>
        <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.postId}</td>
        <td>{user.reported}</td>
        
        <td>{user.feedback}</td>
        <td>
        <button 
          onClick={()=>handleDelete(user._id)}
          className="btn btn-lg bg-amber-500  hover:text-white hover:bg-black">
          <MdPendingActions className="text-white text-2xl"></MdPendingActions>

          </button>
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

export default ReportComment;