import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: userInfo = [] } = useQuery({
    queryKey: ['userInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/info?email=${user?.email}`);
      return res.data;
    },
  });

  
  const normalizedUserInfo =  userInfo[0];

  return normalizedUserInfo;
};

export default useUserInfo;