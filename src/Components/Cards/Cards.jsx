import usePost from "../../hooks/usePost";
import Card from "./Card"
const Cards = () => {
  const [posts, loading, toggleSortByPopularity] = usePost();

  return (
    <div className=''>
      <div>
        <div className="flex justify-center gap-4">
          <div className="mt-2">
            <h2 className="font-bold text-xl">Want to see the post based on popularity</h2>
          </div>
          <div>
            <button className="btn btn-warning hover:text-white hover:bg-black" onClick={toggleSortByPopularity}>
              Click here
            </button>
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
