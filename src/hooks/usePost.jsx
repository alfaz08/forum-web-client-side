import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const usePost = (page, sortByPopularity) => {
  const axiosPublic = useAxiosPublic();

  const fetchPosts = async () => {
    const res = await axiosPublic.get('/posts', { params: { page, sortByPopularity } });
    return res.data;
  };

  const { data: posts = [], isPending: loadingNormal, refetch: refetchNormal } = useQuery({
    queryKey: ['post', 'normal', page, sortByPopularity],
    queryFn: fetchPosts,
  });

  return [posts, loadingNormal, refetchNormal];
};

export default usePost;