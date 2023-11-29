import useAuth from "../../hooks/useAuth";
import useTag from "../../hooks/useTag";


const PopularTags = () => {
  const [tag] =useTag()
  
  return (
    <div>
      <h2 className="text-center font-bold text-4xl mb-6 mt-8">Popular Tags</h2>
       <div className="grid grid-cols-2 md:flex justify-center"> 

      {/* <h2 className="border border-amber-400 text-center w-32 mr-4 p-2 rounded-full font-bold text-xl">Technology</h2> */}
      {
        tag?.map(item=><h2 
          key={item._id} className="border border-amber-400 
          text-center mr-4 mb-4 p-3 rounded-full font-bold text-xl">
           {item.tag}</h2>)
      }
     
      
      </div>
    </div>
      
   
  );
};

export default PopularTags;