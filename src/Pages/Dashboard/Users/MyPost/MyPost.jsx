import useMyPost from "../../../../hooks/useMyPost";


const MyPost = () => {
  const [myPost] = useMyPost()
  console.log(myPost);
  return (
    <div>
      <h2>My Post</h2>
    </div>
  );
};

export default MyPost;