import { MdPendingActions } from "react-icons/md";

import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useReported from "../../../../hooks/useReported";


const ReportComment = () => {
  const [reported] =useReported()
  console.log('reported',reported);
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