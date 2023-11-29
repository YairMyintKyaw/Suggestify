import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GetStarted from "./pages/GetStarted/GetStarted";
import FeedbackGiven from "./pages/FeedbackGiven/FeedbackGiven";
import HowItsDeveloped from "./pages/HowItsDeveloped/HowItsDeveloped";
import Home from "./pages/Home/Home";
import SuggestionBoxCreation from "./pages/SuggestionBoxCreation/SuggestionBoxCreation";
import Feedbacks from "./pages/Feedbacks/Feedbacks";
import Medium from "./components/LandingMedium/Medium";

const routes = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route exact path="/" element={<Medium />} />
        <Route exact path="/get-started" element={<GetStarted />} />
        <Route exact path="/give-feedback/:uid" element={<FeedbackGiven />} />
        <Route
          exact
          path="/how-it-is-developed"
          element={<HowItsDeveloped />}
        />
        <Route exact path="/home" element={<Home />} />
        <Route
          exact
          path="/home/create-box"
          element={<SuggestionBoxCreation />}
        />
        <Route exact path="/home/feedbacks/:uid" element={<Feedbacks />} />
      </Routes>
    </Suspense>
  );
};

export default routes;
