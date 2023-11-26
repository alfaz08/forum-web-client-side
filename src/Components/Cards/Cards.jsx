import React from 'react';
import usePost from '../../hooks/usePost';
import Card from './Card';

const Cards = () => {
const [posts] =usePost()
console.log(posts);
  return (
    <div className=''>
      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {
          posts?.map(post=> <Card key={post._id} post={post}></Card>)
        }
      </div>
    </div>
  );
};

export default Cards;