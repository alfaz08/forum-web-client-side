import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../hooks/useAuth";
import useSingle from "../../../../hooks/useSingle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  FaAddressCard,
  FaCommentDots,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa6";
import {
  MdCardMembership,
  MdOutlineCardMembership,
  MdOutlineMail,
} from "react-icons/md";

const AdminHome = () => {
  const [single] = useSingle();
  console.log(single);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("admin-stats");
      return res.data;
    },
  });
  console.log(stats);

  return (
    <div>
      <SectionTitle
        heading="Profile"
        subHeading="Welcome to Your"
      ></SectionTitle>

      <div className="flex justify-center">
        <div className="card w-96 bg-base-100 ">
          <figure>
            <img className="mt-4 w-96 h-96" src={user?.photoURL} alt="Shoes" />
          </figure>
          <div className="card-body grid justify-center">
           <div className="flex">
           <FaAddressCard className="text-lg mt-1"/>
           <h2 className="card-title ">
             
              User Name: {user?.displayName}
            </h2>
           </div>


          <div className="flex">
          <MdOutlineMail className="text-lg mt-1"/>
          <h2 className="card-title">
             
              User Email: {user?.email}
            </h2>
          </div>
          </div>
        </div>
      </div>

      <div className=" bg-base-100 ">
      <h2 className="text-4xl font-bold flex justify-center">Statistics</h2>
        <div className="stats shadow">
         
          <div className="stat bg-teal-200">
            <div className="stat-figure text-secondary">
              <FaDollarSign className="text-4xl"></FaDollarSign>
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">${stats?.revenue}</div>
          </div>

          <div className="stat bg-teal-200">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-4xl"></FaUsers>
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{stats?.users}</div>
          </div>

          <div className="stat bg-teal-200">
            <div className="stat-figure text-secondary">
              <FaCommentDots className="text-4xl" />
            </div>
            <div className="stat-title">Total Comments</div>
            <div className="stat-value">{stats?.comments}</div>
          </div>

          <div className="stat bg-teal-200">
            <div className="stat-figure text-secondary">
              <MdOutlineCardMembership className="text-4xl" />
            </div>
            <div className="stat-title">Gold Membership</div>
            <div className="stat-value">{stats?.membership}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
