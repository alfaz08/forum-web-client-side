import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdOutlinePostAdd } from "react-icons/md";
import { BsPostcardFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { MdAddAlert } from "react-icons/md";

const Dashboard = () => {


  const isAdmin =false

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-teal-400">




         <ul className="menu">
           {
            isAdmin ?
            <>
             <li>
              <NavLink to="/dashboard/adminHome">
              <ImProfile />
                Admin Profile
                </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manageUsers">
              <FaUsers />
              Manage Users
                </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reportComment">
              <FaCommentAlt />
             Reported Comments
                
                </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/announcement">
              <MdAddAlert />
                Announcement
                </NavLink>
            </li>
            </>
            :
            <>
             <li>
              <NavLink to="/dashboard/userHome">
              <ImProfile />
                User Profile
                </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addPost">
              <MdOutlinePostAdd />

                Add Post
                </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myPost">
              <BsPostcardFill />
                My Post
                </NavLink>
            </li>
            </>
           }
            
            
            {/* home */}
        <div className="divider"></div>
        <li>
              <NavLink to="/">
              <FaHome></FaHome>
                Home
                </NavLink>
            </li>
        


         </ul>
      </div>
         {/* dashboard content */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>

    </div>
  );
};

export default Dashboard;