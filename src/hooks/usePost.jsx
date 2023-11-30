import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePost = () => {
  const axiosPublic = useAxiosPublic();

  const fetchPosts = async () => {
    const res = await axiosPublic.get('/posts');
    return res.data;
  };

  const fetchSortedPosts = async () => {
    const res = await axiosPublic.get('/posts', { params: { sortByPopularity: true } });
    return res.data;
  };

  const { data: posts = [], isPending: loadingNormal, refetch: refetchNormal } = useQuery({
    queryKey: ['post', 'normal'],
    queryFn: fetchPosts,
  });

  const { data: sortedPosts = [], isPending: loadingSorted, refetch: refetchSorted } = useQuery({
    queryKey: ['post', 'sorted'],
    queryFn: fetchSortedPosts,
    enabled: false,
  });

  const toggleSortByPopularity = async () => {
    await refetchSorted();
  };

  return [sortedPosts.length > 0 ? sortedPosts : posts, loadingNormal || loadingSorted, toggleSortByPopularity];
};

export default usePost;