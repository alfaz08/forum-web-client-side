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
      <Marquee pauseOnHover={true} speed={50} className="marquee-item bg-gray-100">
  {announcement.map((item, index) => (
    <span key={item._id}>
      <span className='mt-4 text-red-600 font-bold'> {item.title}</span>
      <span className='mt-4'> {item.description}</span>
      {index < announcement.length  && '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'} {/* Non-breaking spaces */}
    </span>
  ))}
</Marquee>
    </div>
    </div>
  );
};

export default AnnounceDetails;