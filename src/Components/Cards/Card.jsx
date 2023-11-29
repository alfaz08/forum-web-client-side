import { Link } from "react-router-dom";

const Card = ({ post }) => {
  const { _id, createdAt, commentCount, voteCount, downVote, upVote, email, tag, name, image, title } = post;

  // Format the createdAt time
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(createdAt));

  return (
    <div>
      <div className="card w-80 bg-base-100 shadow-xl mt-4">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl w-48 h-32" />
        </figure>
        <div className="card-body">
          <h2 className="">Author Name: {name}</h2>
          <h2 className="">Post Title: {title}</h2>
          <h2 className="">Tags: {tag}</h2>
          <h2 className="">Total Comment: {commentCount}</h2>
          <h2 className="">Total Vote: {voteCount}</h2>
          <h2 className="">Post time: {formattedDate}</h2>
          <div className="card-actions justify-center">
            <Link to={`/post/${_id}`}>
              <button className="btn btn-warning hover:bg-black hover:text-white">See Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;