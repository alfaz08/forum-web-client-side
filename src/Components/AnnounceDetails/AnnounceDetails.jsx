import useAnnounce from "../../hooks/useAnnounce";
import useTag from "../../hooks/useTag";


const AnnounceDetails = () => {
  const [tag] =useTag()
  console.log('tag',tag);
  const [announcement] =useAnnounce()
  console.log('annouce',announcement);
  return (
    <div>
      sdasdad
    </div>
  );
};

export default AnnounceDetails;