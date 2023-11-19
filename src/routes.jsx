import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import GetStarted from "./pages/GetStarted/GetStarted";
import FeedbackGiven from "./pages/FeedbackGiven/FeedbackGiven";
import HowItsDeveloped from "./pages/HowItsDeveloped/HowItsDeveloped";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import SuggestionBoxCreation from "./pages/SuggestionBoxCreation/SuggestionBoxCreation";
import Feedbacks from "./pages/Feedbacks/Feedbacks";

const routes = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/give-feedback/:uid" element={<FeedbackGiven />} />
        <Route path="/how-it-is-developed" element={<HowItsDeveloped />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/create-box" element={<SuggestionBoxCreation />} />
        <Route path="/home/feedbacks/:uid" element={<Feedbacks />} />
      </Routes>
    </Suspense>
  );
};

export default routes;
