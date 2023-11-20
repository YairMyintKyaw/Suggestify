import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addFeedbackBox,
  createSuggestionBox,
  isAuthenticated,
} from "../../util/firebase";
import { useSelector } from "react-redux";
import { serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";

const SuggestionBoxCreation = () => {
  const nav = useNavigate();
  const userId = useSelector((state) => state.user.uid);

  // if unauthorize, go back to landing page
  useEffect(() => {
    !isAuthenticated() && nav("/");
  }, []);
  return (
    <div className="h-[90vh] bg-primary flex flex-col px-5 md:px-10">
      <div className="flex justify-end  p-10 pr-0 ">
        <NavLink
          to={"/home"}
          className={
            "bg-darkGreen shadow text-primary text-lg flex items-center justify-center px-4  "
          }
        >
          Go Back
        </NavLink>
      </div>
      <div className="flex-1 flex items-center">
        <div className="bg-darkGreen min-w-[300px] md:w-3/4 w-full max-w-full px-5 lg:px-11 flex items-center h-2/3">
          <Formik
            initialValues={{ question: "" }}
            validate={(values) => {
              const error = {};
              if (!values.question) error.question = "Required";

              return error;
            }}
            onSubmit={async (values) => {
              // save to firestore
              const question = values.question;
              const { id } = await addFeedbackBox(userId, question);
              
              createSuggestionBox(question, serverTimestamp(), id);
              nav("/home");
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
              <form action="" onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col">
                  <input
                    required
                    type="text"
                    name="question"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.question}
                    placeholder="Enter your question."
                    className="border-b border-primary outline-none py-5 text-xl w-full bg-inherit placeholder:text-primary placeholder:opacity-95"
                  />

                  <div className="text-red text-lg mt-1 h-5">
                    {errors.question && touched.question && errors.question}
                  </div>

                  <button
                    className="bg-green md:min-w-[300px] w-auto md:w-3/5 max-w-full mt-5 h-fit px-7 py-2 text-lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Create suggestion box
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBoxCreation;
