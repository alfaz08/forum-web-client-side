import { FaSearchPlus } from "react-icons/fa";
import usePost from "../../hooks/usePost";

const Banner = () => {

  const [posts] =usePost()
  
  console.log(posts);
  return (
    <div>
      <div className="hero h-72 md:h-[450px] border border-teal-100" style={{backgroundImage: 'url(https://i.ibb.co/zx1hVXY/ezgif-com-webp-to-jpg.jpg)'}}>
  <div className="hero-overlay bg-opacity-10"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md flex">
    <input type="text" placeholder="What are you looking for" className=" h-16 bg-white md:w-96 text-black p-2 rounded-l-full shadow-md" />
    <button className="h-16 rounded-r-full btn bg-warning text-black text-lg hover:bg-black hover:text-white"><FaSearchPlus />Search</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Banner;

