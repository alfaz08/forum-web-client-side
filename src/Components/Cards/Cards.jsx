import { useState } from "react";
import usePost from "../../hooks/usePost";
import Card from "./Card";

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const [posts, loading, toggleSortByPopularity] = usePost();

  // Calculate the index range for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=''>
      <div>
        <div className="flex justify-end gap-4">
          
          <div>
            <button className="btn mr-12 btn-warning hover:text-white hover:bg-black" onClick={toggleSortByPopularity}>
              Sort By Popularity
            </button>
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {currentPosts.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* Render pagination buttons */}
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`btn mx-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cards;