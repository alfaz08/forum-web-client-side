import { Link } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { LuCalendarClock } from "react-icons/lu";

import './card.css'
const Card = ({ post }) => {
  const {
    _id,
    createdAt,
    commentCount,
    voteCount,
    downVote,
    upVote,
    email,
    tag,
    name,
    image,
    title,
  } = post;

  // Format the createdAt time
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(createdAt));

  return (
    <div>
      <div className="card w-96 bg-teal-100 shadow-xl h-[450px] mt-2">
       <div className="container">
       <h2 className="font-bold bottom-left p-2 bg-teal-100">{tag}</h2>
        <img src={image} alt="Shoes" className="rounded-xl h-52 w-full" />
       </div>
        <div className="card-body text-center">
          
          <h2 className="font-bold text-center text-xl">{title}</h2>
          <h2 className="">Author Name: {name}</h2>
        
        
          <div className="flex items-center gap-4 justify-center">
            <div>
            <h2 className="">Total Comment: {commentCount}</h2>
            </div>
            <div className="flex items-center mr-4">
              <AiFillLike className="text-2xl" />
              <h2 className="ml-2">{upVote}</h2>
            </div>
            <div className="flex items-center">
              <AiFillDislike className="text-2xl" />
              <h2 className="ml-2">{downVote}</h2>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <div className="mt-1 ">
            <LuCalendarClock className="text-xl text-amber-600" />
            </div>
            <div>
            {formattedDate}
            </div>
          </div>
         
          <div className="card-actions justify-center">
            <Link to={`/post/${_id}`}>
              <button className="btn btn-warning hover:bg-black hover:text-white">
                See Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
