import Announcement from "../Dashboard/Admin/Announcement/Anouncement";
import Banner from "../../Components/Banner/Banner";
import Cards from "../../Components/Cards/Cards";
import Footer from "../../Components/Footer/Footer";
import PopularTags from "../../Components/PopularTags/PopularTags";
import AnnounceDetails from "../../Components/AnnounceDetails/AnnounceDetails";
import useAnnounce from "../../hooks/useAnnounce";



const Home = () => {
  const [announcement] =useAnnounce()
 
  return (
    <div >
    <Banner></Banner>
     <div className="container mx-auto ">
      {
        announcement?.length >0 ?
        <div>
      <PopularTags></PopularTags>
      <AnnounceDetails></AnnounceDetails>
      </div>
      :
      <div>
      <PopularTags></PopularTags>
      </div>
      }
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
