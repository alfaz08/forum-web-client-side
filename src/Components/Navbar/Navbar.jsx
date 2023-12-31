import { Link, NavLink } from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAdmin from "../../hooks/useAdmin";
import useAnnounce from "../../hooks/useAnnounce";
import { HiMiniBellAlert } from "react-icons/hi2";


const Navbar = () => {
  const [announcement] =useAnnounce()
  const {user,logOut} = useAuth()
  const [isAdmin] =useAdmin()
  console.log(user);

  const handleLogOut =()=>{
    logOut()
    .then(()=>
    {
      toast('user logged out successfully')
    })
    .catch(error=>toast(error))
  
  }

  const navLinks = (
    <>
      <li className="text-xl"><NavLink to="/">Home</NavLink></li>
      <li className="text-xl"><NavLink to="/membership">Membership</NavLink></li>
      <li className="bg-teal-200 rounded-lg">
        <div className="bg-teal-300">
          <HiMiniBellAlert className=" text-4xl" />
          <div className="badge bg-teal-300 font-bold">{announcement.length}</div>
        </div>
      </li>
      <li className="text-xl"><NavLink to="/contact" >Contact</NavLink></li>
    </>
  );
  
  return (
    <div>
      <div className="navbar bg-teal-200">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       {navLinks}
      </ul>
    </div>
    
    <img className="hidden md:block w-24 h-16 rounded-full" src="https://i.ibb.co/rHdHPCh/Opinion-removebg-preview.png" alt="" />
    <h2 className="hidden md:block text-2xl font-bold">OpinionOverflow</h2>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navLinks}
    </ul>
  </div>



  <div className="navbar-end">
  {
    user?
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
            user.photoURL ?
            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
            :
            <img alt="Tailwind CSS Navbar component" src="https://i.ibb.co/37dj5GJ/blank-profile-picture-973460-960-720.jpg" />
          }
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
            {user.displayName}
        </li>
       {
        isAdmin ?
        <Link to='/dashboard/adminHome'>
        <li><a className="hover:bg-warning">Dashboard</a></li>
        </Link>
        :
        <Link to='/dashboard/userHome'>
        <li><a className="hover:bg-warning">Dashboard</a></li>
        </Link>
       }
        <li onClick={handleLogOut}><a className="hover:bg-warning">Logout</a></li>
      </ul>
    </div>
    :
    <div>
      <Link to="/login" className="text-2xl font-bold">Join US</Link>
    </div>
  }

  </div>



</div>
    </div>
  );
};

export default Navbar;