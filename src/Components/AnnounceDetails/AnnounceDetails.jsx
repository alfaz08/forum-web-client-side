import useAnnounce from "../../hooks/useAnnounce";
import useTag from "../../hooks/useTag";
import Marquee from "react-fast-marquee";

const AnnounceDetails = () => {
  const [tag] =useTag()
  console.log('tag',tag);
  const [announcement] =useAnnounce()
  console.log('annouce',announcement);
  return (
    <div className=" max-w-5xl mx-auto mt-8 mb-8">
      <div className="flex">
      <button className="btn btn-warning">Announcement</button>
      {/* <Marquee>
      I can be a React component, multipleczxzxc React components, or just some text.
      </Marquee> */}
     {announcement?.map(item => (
  <Marquee key={item._id} pauseOnHover={true} speed={100} className="marquee-item">
    <h2 className="text-xl font-bold text-red-600 mr-2">{item.title}</h2>
    <h2 className="text-lg mr-2">{item.description}</h2>
  </Marquee>
))}
    </div>
    </div>
  );
};

export default AnnounceDetails;