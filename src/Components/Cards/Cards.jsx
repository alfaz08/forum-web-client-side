import React, { useState, useEffect } from 'react';
import usePost from '../../hooks/usePost';
import Card from './Card';

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [posts, loading, refetch] = usePost(currentPage, sortByPopularity);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortToggle = () => {
    setSortByPopularity((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, [sortByPopularity, refetch]);

  return (
    <div className="">
      <div>
        <div className="flex justify-center gap-4">
          <div className="mt-2">
            <h2 className="font-bold text-xl">Want to see the post based on popularity</h2>
          </div>
          <div>
            <button
              className="btn btn-warning hover:text-white hover:bg-black"
              onClick={handleSortToggle}
            >
              Sort
            </button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-primary mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl font-bold">{currentPage}</span>
        <button
          className="btn btn-primary ml-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={posts.length < 5}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;