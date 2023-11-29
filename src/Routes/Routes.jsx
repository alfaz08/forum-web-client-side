import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Dashboard from "../layout/Dashboard";
import UserHome from "../Pages/Dashboard/Users/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ReportComment from "../Pages/Dashboard/Admin/ReportComment/ReportComment";
import Announcement from "../Pages/Dashboard/Admin/Announcement/Anouncement";
import AddPost from "../Pages/Dashboard/Users/AddPost/AddPost";
import MyPost from "../Pages/Dashboard/Users/MyPost/MyPost";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import MemberShip from "../Pages/MemberShip/MemberShip";
import PrivateRoute from "./PrivateRoute";
import Contact from "../Pages/Contact/Contact";
import AdminRoute from "./AdminRoute";
import CardDetails from "../Components/Cards/CardDetails";
import CommentDetails from "../Pages/Dashboard/Users/MyPost/CommentDetails";
import Payment from "../Pages/Dashboard/Users/Payment/Payment";
import AddTag from "../Pages/Dashboard/Admin/Tag/AddTag";


const router = createBrowserRouter([
  {
   path: "/",
   element: <MainLayout></MainLayout>,
   errorElement: <ErrorPage></ErrorPage>,
   children:[
    {
      path: "/",
      element: <Home></Home>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/signUp",
      element: <SignUp></SignUp>,
    },
    {
      path: "/membership",
      element: <PrivateRoute><MemberShip></MemberShip></PrivateRoute>,
    },
    {
      path: "/payment",
      element: <PrivateRoute> <Payment></Payment> </PrivateRoute>,
    },
    {
      path: "/contact",
      element: <Contact></Contact>,
    },
    {
      path:"/post/:id",
      element: <CardDetails></CardDetails>
      
    }
   ]
  },

  {
    path:"dashboard",
   element: <Dashboard></Dashboard>,
   errorElement: <ErrorPage></ErrorPage>,
   children:[
    //for users
    {
      path: "userHome",
      element: <PrivateRoute><UserHome></UserHome></PrivateRoute>,
    },
    {
      path: "addPost",
      element: <PrivateRoute><AddPost></AddPost></PrivateRoute>,
    },
    {
      path: "myPost",
      element: <PrivateRoute><MyPost></MyPost></PrivateRoute>,
    },
    {
      path:"myPost/comments/:id",
      element: <PrivateRoute><CommentDetails></CommentDetails></PrivateRoute>
    },
    


    //for admin
    {
      path: "adminHome",
      element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
    },
    {
      path: "manageUsers",
      element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
    },
    {
      path: "reportComment",
      element: <AdminRoute><ReportComment></ReportComment></AdminRoute> ,
    },
    {
      path: "announcement",
      element: <AdminRoute><Announcement></Announcement></AdminRoute>,
    },
    {
      path: "addTag",
      element: <AdminRoute> <AddTag></AddTag> </AdminRoute>,
    },
   ]
  }


   ]);

export default router;