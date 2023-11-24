import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div>
    <img className="mx-auto mt-28" src='https://i.ibb.co/72ZyFpK/404-page-cover.jpg' alt="" />
    <Link to="/" className="flex justify-center font-extrabold mt-2 text-4xl"><span>Go Home</span></Link>
  </div>
  );
};

export default ErrorPage;