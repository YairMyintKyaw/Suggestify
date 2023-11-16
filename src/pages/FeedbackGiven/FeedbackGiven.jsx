import { Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  addFeedback,
  getFeedbackBoxName,
  getFeedbackCollection,
} from "../../util/firebase";
import Loader from "../../components/Loader/Loader";

const FeedbackGiven = () => {
  const { uid } = useParams();
  const [boxTitle, setBoxTitle] = useState("");
  const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);
  useEffect(() => {
    // fetch data
    getFeedbackCollection("eSHR1q7FF2NV7gznk2oy");
    const getBoxName = async (uid) => {
      const title = await getFeedbackBoxName(uid);
      setBoxTitle(title);
    };
    getBoxName(uid);
  }, []);
  return (
    <>
      {boxTitle ? (
        <div className="min-h-[90vh] flex flex-col justify-center pb-5 relative">
          {!isFeedbackGiven ? (
            <Formik
              initialValues={{ feedback: "" }}
              validate={(values) => {
                const error = {};
                if (!values.feedback) error.feedback = "Required";

                return error;
              }}
              onSubmit={async (values) => {
                // save to firestore
                await addFeedback(uid, values.feedback);
                setIsFeedbackGiven(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex-col max-w-[500px]  px-10 mx-auto">
                    <label
                      htmlFor="projectName"
                      className="capitalize text-3xl text-primary font-helvetica_compressed mb-5"
                    >
                      {boxTitle}
                    </label>
                    <textarea
                      required
                      type="text"
                      name="feedback"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.feedback}
                      rows={7}
                      placeholder="Answer anonymously"
                      className="text-lg bg-inherit border rounded resize-none border-primary 
              focus:outline-none text-primary p-2 placeholder:text-primary placeholder:opacity-60"
                    />

                    <div className="text-red text-lg mt-1 h-5">
                      {errors.feedback && touched.feedback && errors.feedback}
                    </div>

                    <button
                      className="bg-green mt-5 w-fit h-fit px-7 py-2 text-lg rounded"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          ) : (
            <div
              className="capitalize text-3xl text-primary font-helvetica_compressed
         mb-5 mx-auto p-5 border w-fit"
            >
              Thank You For Your Feedback
            </div>
          )}
          <NavLink
            className="border border-green mx-auto mt-5
     w-fit h-fit px-7 py-2 text-lg absolute bottom-10 left-0 right-0
     hover:bg-green "
            to={"/get-started"}
          >
            Make Your Own Suggestion Box
          </NavLink>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FeedbackGiven;
