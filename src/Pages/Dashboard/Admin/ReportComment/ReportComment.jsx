import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useReported from "../../../../hooks/useReported";


const ReportComment = () => {
  const [reported] =useReported()
  console.log(reported);
  return (
    <div>
       <SectionTitle
        heading="Reported Comments"
        subHeading="Take some actions"
      ></SectionTitle>
    </div>
  );
};

export default ReportComment;