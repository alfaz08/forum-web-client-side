import Announcement from "../Dashboard/Admin/Announcement/Anouncement";
import Banner from "../../Components/Banner/Banner";
import Cards from "../../Components/Cards/Cards";
import Footer from "../../Components/Footer/Footer";
import PopularTags from "../../Components/PopularTags/PopularTags";



const Home = () => {
  return (
    <div >
    <Banner></Banner>
     <div className="container mx-auto ">
      <div>
      <PopularTags></PopularTags>
      </div>
      <div>
      {/* akhane condition use kore announcement dekhabo */}
      <Announcement></Announcement>
      </div>
      <div className=" max-w-7xl mx-auto">
        
         {/* all card thakbe */}
         <Cards></Cards>
      </div>
     </div>
    <Footer></Footer>
    </div>
  );
};

export default Home;
