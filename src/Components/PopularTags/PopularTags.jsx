import useAuth from "../../hooks/useAuth";


const PopularTags = () => {
  
  return (
    <div>
      <h2 className="text-center font-bold text-4xl mb-4 mt-8">Popular Tags</h2>
       <div className="flex justify-center"> 

      <h2 className="border border-amber-400 text-center w-32 mr-4 p-2 rounded-full font-bold text-xl">Technology</h2>
      <h2 className="border border-amber-400  text-center w-32 mr-4 p-2 rounded-full font-bold text-xl">Science</h2>
      
      </div>
    </div>
      
   
  );
};

export default PopularTags;