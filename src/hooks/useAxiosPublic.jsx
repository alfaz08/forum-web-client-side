import axios from "axios";


const axiosPublic = axios.create({
  baseURL: 'https://forum-web-server.vercel.app'
}
  )


const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;