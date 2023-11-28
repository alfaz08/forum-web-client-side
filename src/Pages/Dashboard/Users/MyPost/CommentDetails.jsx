import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const CommentDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [feedbackValues, setFeedbackValues] = useState({});
  const { user } = useAuth();

  const { data: comment = [] } = useQuery({
    queryKey: ['comment', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/single?postId=${id}`);
      return res.data;
    },
  });

  console.log(comment);

  const handleFeedbackChange = (index, value) => {
    setFeedbackValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const handleReportClick = async (post) => {
    const feedbackValue = feedbackValues[comment.indexOf(post)];
    
    // Check if the selected value is not the default value
    if (feedbackValue && feedbackValue !== "default") {
      const postData = {
        feedback: feedbackValue,
        postId: post._id,
        reported: post.userEmail,
        reporting: user?.email,
      };

      console.log("Sending data to the server:", postData);

      const res = await axiosSecure.post("/reports", postData);
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Report is added to the post",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-evenly my-4">
          <h2>MyPost: {comment.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <td>Email</td>
                <td>Comment Text</td>
                <td>Feedback</td>
                <td>Report</td>
              </tr>
            </thead>
            <tbody>
              {comment.map((post, index) => (
                <tr key={post._id}>
                  <th>{index + 1}</th>
                  <td>{post.userEmail}</td>
                  <td>{post.commentDes}</td>
                  <td>
                    <select
                      value={feedbackValues[index] || ""}
                      onChange={(e) =>
                        handleFeedbackChange(index, e.target.value)
                      }
                      required
                      className="select select-bordered border-amber-400 w-96"
                    >
                      <option value="" disabled>
                        Give Feedback
                      </option>
                      <option value="spam">Spam</option>
                      <option value="Irrelevent">Irrelevent</option>
                      <option value="violate community rules">
                        Violate Community Rules
                      </option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleReportClick(post)}
                      className="btn btn-warning"
                      disabled={!feedbackValues[index] || feedbackValues[index] === "default"}
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;