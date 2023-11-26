import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = (children) => {
  const [user,loading] =useAuth()
  const [isAdmin,isAdminLoading] =useAdmin()
  const location =useLocation()

  if (loading || isAdminLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin h-14 w-14 border-t-4 border-teal-700 rounded-full border-r-4"></div>
        <span className="text-lg mt-4">Data Loading! Please Wait</span>
      </div>
    );
  }
 
  if(user && isAdmin){
  return children;
 }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default AdminRoute;