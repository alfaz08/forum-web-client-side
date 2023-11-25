import { FaLocationDot,FaMobileScreenButton,FaM } from "react-icons/fa6";


const Contact = () => {
  return (
    <div className="flex justify-center items-center mt-4 b">
      <div className="card w-[700px] ">
  <figure><img src="https://i.ibb.co/c6yY19P/contactus.webp" alt="car!"/></figure>
  <div className="card-body text-center items-center">
    <h2 className="card-title "> <FaM></FaM> OpinionOverflow@gmail.com</h2>
    <h2 className="card-title"><FaMobileScreenButton></FaMobileScreenButton> +88012345678</h2>
    <h2 className="card-title"><FaLocationDot></FaLocationDot> Dhaka,Bangladesh</h2>
    
    <div className="card-actions justify-center">
      <button className="btn bg-amber-400 font-bold">Call Now</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Contact;