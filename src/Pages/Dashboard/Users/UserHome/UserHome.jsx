
import useSingle from "../../../../hooks/useSingle";
import useSinglePost from "../../../../hooks/useSinglePost";
import UserHomeDesign from "./UserHomeDesign";



const UserHome = () => {

  
  const [single] =useSingle()
 
  

  return (
    <div>
      
      {
        single.map(item =><UserHomeDesign key={item._id} item={item}></UserHomeDesign> )
      }
     

    </div>
  );
};

export default UserHome;