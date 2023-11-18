import { NavLink } from "react-router-dom";

const FeedbackTab = ({ feedback: { name, id, unreadFeedbackNumber } }) => {
  return (
    <NavLink
      to={`feedbacks/${id}`}
      className="bg-darkGreen w-fit h-fit px-2 py-2 relative "
    >
      <span className="md:text-4xl text-2xl font-helvetica_compressed tracking-wide">{name}</span>

      <span
        className={` ${
          unreadFeedbackNumber ? "flex" : "hidden"
        } flex justify-center items-center text-sm absolute -right-[0.625rem] 
        -top-[0.625rem] w-5 h-5 rounded-full bg-red `}
      >
        {unreadFeedbackNumber}
      </span>
    </NavLink>
  );
};

export default FeedbackTab;
