import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import uuid from "react-uuid";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { useEffect, useState } from "react";
import QrCode from "../../components/QRCode/QrCode";
import {
  deleteFeedbackCollection,
  getFeedbackBoxName,
  getFeedbackCollection,
  updateMarkFeedback,
  updateReadStatusFeedback,
} from "../../util/firebase";
import { pdf } from "@react-pdf/renderer";
import FeedbackPdf from "../Pdf/FeedbackPdf";
import * as FileSaver from "file-saver";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Feedbacks = () => {
  const { uid } = useParams();
  const { uid: userId, displayName } = useSelector((state) => state.user);
  const [isShare, setIsShare] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [feedbacks, setFeedbacks] = useState(null);
  const [boxName, setBoxName] = useState("");
  const nav = useNavigate();
  const toogleMarkFeedback = async (id, markStatus) => {
    try {
      await updateMarkFeedback(uid, id, !markStatus);
      const updatedFeedback = allFeedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, isMarked: !markStatus } : feedback
      );
      setAllFeedbacks(updatedFeedback);
      setFeedbacks(updatedFeedback);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilter = (e) => {
    const filterType = e.target.value;

    if (filterType === "all") {
      setFeedbacks(allFeedbacks);
    } else if (filterType === "saved") {
      const filteredFeedbacks = allFeedbacks.filter(
        (feedback) => feedback.isMarked === true
      );
      setFeedbacks(filteredFeedbacks);
    } else if (filterType === "unread") {
      const filteredFeedbacks = allFeedbacks.filter(
        (feedback) => feedback.isRead === false
      );
      setFeedbacks(filteredFeedbacks);
    }
  };
  const handleAction = async (e) => {
    const action = e.target.value;
    if (action === "convert_pdf") {
      const report = await pdf(
        <FeedbackPdf feedbacks={feedbacks} title={boxName} name={displayName} />
      ).toBlob();
      FileSaver.saveAs(report, boxName);
    } else if (action === "delete") {
      await deleteFeedbackCollection(uid, userId);
      nav("/home");
    } else if (action === "share") {
      setIsShare(true);
    }
  };
  const handleGoBack = () => {
    isShare ? setIsShare(false) : nav(-1);
  };

  const refreshFeedbacks = async () => {
    const feedbacks = await getFeedbackCollection(uid);
    feedbacks.sort(
      (feedbackA, feedbackB) => feedbackB.dateTime - feedbackA.dateTime
    );
    setAllFeedbacks(feedbacks);
    setFeedbacks(feedbacks);
  };

  useEffect(() => {
    const getFeedbacks = async (uid) => {
      const feedbacks = await getFeedbackCollection(uid);
      feedbacks.sort(
        (feedbackA, feedbackB) => feedbackB.dateTime - feedbackA.dateTime
      );
      console.log(feedbacks);
      setAllFeedbacks(feedbacks);
      setFeedbacks(feedbacks);
    };
    const getFeedbackBoxTitle = async (uid) => {
      const name = await getFeedbackBoxName(uid);
      console.log(name);
      setBoxName(name);
    };

    getFeedbackBoxTitle(uid);
    getFeedbacks(uid);
  }, []);

  useEffect(() => {
    updateReadStatusFeedback(uid);
  }, []);
  return (
    <>
      {boxName ? (
        <div>
          {feedbacks?.length && !isShare ? (
            <div className="min-h-screen bg-primary flex flex-col md:px-10 px-5 ">
              <div className="flex justify-between flex-col-reverse md:flex-row py-10 gap-5 md:gap-0">
                <h1 className="bg-darkGreen shadow font-helvetica_compressed text-primary rounded-sm text-4xl flex items-center justify-center px-4 py-2 ">
                  {boxName}
                </h1>
                <div className="flex justify-end gap-3 h-fit">
                  <button
                    className={
                      "bg-darkGreen text-primary h-fit px-4 py-1 rounded-sm w-fit ms-auto"
                    }
                    onClick={handleGoBack}
                  >
                    Go Back
                  </button>
                  <button
                    className="bg-darkGreen text-primary text-xl   px-4 py-1 rounded-sm w-fit "
                    onClick={refreshFeedbacks}
                  >
                    <IoIosRefresh />
                  </button>
                </div>
              </div>
              <div className="flex justify-between flex-col md:flex-row gap-5 md:gap-0">
                <div className="text-darkGreen font-helvetica_compressed text-3xl">
                  Number of Total Feedback
                  <span className="whitespace-nowrap">
                    Received - {feedbacks.length}
                  </span>
                </div>
                <div className="dropdowns flex  gap-3">
                  <select
                    name="Action"
                    className="bg-darkGreen text-primary px-2 py-1 text-xl h-fit "
                    onChange={handleAction}
                  >
                    <option value="">Action</option>
                    <option value="convert_pdf">Convert to PDF</option>
                    <option value="share">Share</option>
                    <option value="delete">Delete</option>
                  </select>
                  <select
                    name="Filter"
                    className="bg-darkGreen text-primary px-2 py-1 text-xl h-fit"
                    onChange={handleFilter}
                  >
                    <option value="all">All</option>
                    <option value="saved">Saved</option>
                    <option value="unread">Unread</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-10">
                {feedbacks.map(({ id, feedback, isMarked, isRead }) => (
                  <div
                    className={`text-primary shadow-lg py-3 px-5 rounded flex  items-start gap-4 ${
                      !isRead ? "unread" : "bg-green"
                    }`}
                    key={uuid()}
                  >
                    <span className="flex-1 text-justify font-openSans text-lg transition-all">
                      {feedback}
                    </span>
                    <span
                      className={`text-3xl  cursor-pointer hover:scale-95 ${
                        !isRead ? "unread" : "text-darkGreen"
                      }`}
                    >
                      {isMarked ? (
                        <BsBookmarkCheckFill
                          onClick={toogleMarkFeedback.bind(null, id, isMarked)}
                        />
                      ) : (
                        <BsBookmarkPlus
                          onClick={toogleMarkFeedback.bind(null, id, isMarked)}
                        />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-primary flex flex-col px-10 pb-10 ">
              <div className="flex justify-between flex-col-reverse md:flex-row py-10 gap-5 md:gap-0">
                <h1 className="bg-darkGreen shadow font-helvetica_compressed text-primary rounded-sm text-4xl flex items-center justify-center px-4 py-2">
                  {boxName}
                </h1>
                <button
                  className={
                    "bg-darkGreen text-primary h-fit px-4 py-1 rounded-sm w-fit ms-auto"
                  }
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
              </div>
              <QrCode
                url={`https://suggestify-seven.vercel.app/give-feedback/${uid}`}
                name={boxName}
              />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Feedbacks;
