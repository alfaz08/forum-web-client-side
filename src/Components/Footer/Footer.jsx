import { FaFacebook,FaInstagramSquare,FaYoutube,FaTwitter} from "react-icons/fa";


const Footer = () => {
  return (
    <div className="mt-8">
      <footer className="footer footer-center p-10 bg-teal-200 text-base-content rounded">
<div className="grid grid-cols-1 md:grid-cols-3">

<div>

  <h2 className="font-bold text-2xl">Follow Us</h2>
   <div className="mt-2 text-2xl flex items-center justify-center gap-6">
   <FaFacebook></FaFacebook>
   <FaInstagramSquare></FaInstagramSquare>
   <FaYoutube></FaYoutube>
   <FaTwitter></FaTwitter>
   </div>
  
  
    <p className="mt-4 font-semibold">Copyright © 2023 - All right reserved by Opinion Overflow</p>

 </div>

 <div className="grid">
   <div>
   <h2 className="font-bold text-4xl"> Discuss on the Forum</h2>
   </div>
   <div>
   <button className="btn btn-outline w-[100px] text-center text-black mt-2 bg-white">Click Now</button>
   </div>
    
 </div>
 <div>
 <form>
    <header className="footer-title text-black">Newsletter</header> 
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text font-bold">Enter your email address</span>
      </label> 
      <div className="join">
        <input type="text" placeholder="username@site.com" className="input input-bordered join-item" /> 
        <button  className="btn bg-warning ">Subscribe</button>
      </div>
    </fieldset>
  </form>
 </div>
</div>
  
</footer>

    </div>
  );
};

export default Footer;