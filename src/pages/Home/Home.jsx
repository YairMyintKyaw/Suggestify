import { NavLink, useNavigate } from "react-router-dom";
import FeedbackTab from "../../components/FeedbackTab/FeedbackTab";
import uuid from "react-uuid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getAllFeedbacks, isAuthenticated } from "../../util/firebase";
import FeedbackBoxSkeleton from "../../components/FeedbackBoxSkeleton/FeedbackBoxSkeleton";

const Home = () => {
  const nav = useNavigate();
  const userId = useSelector((state) => state.user.uid);
  const [feedbackBox, setFeedbackBox] = useState();
  const [allFeedbackBox, setAllFeedbackBox] = useState();
  const handleInputChange = (e) => {
    const inputData = e.target.value;
    const filteredBoxes = allFeedbackBox.filter((box) =>
      box.name.toLowerCase().includes(inputData)
    );
    setFeedbackBox(filteredBoxes);
  };

  // if unauthorize, go back to landing page
  useEffect(() => {
    !isAuthenticated() && nav("/");
  }, []);

  useEffect(() => {
    const fetchAndSetFeedbackBox = async () => {
      const feedbackBoxes = await getAllFeedbacks(userId);
      setFeedbackBox(feedbackBoxes);
      setAllFeedbackBox(feedbackBoxes);
    };
    fetchAndSetFeedbackBox();
  }, []);

  return (
    <div className="min-h-[90vh] bg-green flex flex-col pb-5">
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between md:px-10 py-10 px-5  ">
        <input
          type="text"
          onChange={handleInputChange}
          className="border min-w-[300px] shadow text-primary border-primary text-lg rounded-md bg-inherit px-3 py-1 outline-none placeholder:text-primary"
          placeholder="Search..."
        />
        <NavLink
          to={"create-box"}
          className={
            "bg-darkGreen shadow text-primary text-lg flex items-center justify-center px-4 py-1 md:py-0 "
          }
        >
          + Create Suggestion Box
        </NavLink>
      </div>
      {feedbackBox ? (
        <div className="flex flex-wrap md:px-10 px-5 gap-4  ">
          {feedbackBox?.map((feedback) => (
            <FeedbackTab feedback={feedback} key={uuid()} />
          ))}
        </div>
      ) : (
        <div>
          <FeedbackBoxSkeleton />
          <FeedbackBoxSkeleton />
        </div>
      )}
      {/* <div className="absolute bg-darkGreen left-0 right-0 top-0 bottom-0 m-auto flex flex-col justify-center px-12">
        <input
          type="text"
          placeholder="What is your name?"
          className="w-full border-primary border-b outline-none text-primary text-4xl
           pb-4 bg-inherit placeholder:text-primary placeholder:opacity-95 mt-48 "
        />
        <button className="bg-green mt-20 w-fit h-fit px-12 py-3 text-xl">
          Submit
        </button>
      </div> */}
    </div>
  );
};

export default Home;
