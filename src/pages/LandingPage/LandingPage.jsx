import ScrollReveal from "scrollreveal";
import "./style.css";
import { useEffect } from "react";
import Feedback from "../../components/Feedback/Feedback";
import UserGuide from "../../components/UserGuide/UserGuide";
import HomeHeroSection from "../../components/HomeHeroSection/HomeHeroSection";
import { useOutletContext } from "react-router-dom";

const LandingPage = () => {
  // const [userGuide, feedback, homeHeroSection] = useOutletContext();
  useEffect(() => {
    let toUp = {
      distance: "200px",
      origin: "bottom",
      interval: 300,
      duration: 1000,
    };
    let toRight = {
      distance: "100px",
      origin: "left",
      interval: 300,
      duration: 1000,
    };
    let toDown = {
      distance: "100px",
      origin: "top",
      interval: 300,
      duration: 1000,
    };
    let toLeft = {
      distance: "100px",
      origin: "right",
      interval: 300,
      duration: 1000,
    };
    ScrollReveal().reveal(".toDown", toDown);
    ScrollReveal().reveal(".toLeft", toLeft);
    ScrollReveal().reveal(".toRight", toRight);
    ScrollReveal().reveal(".toUp", toUp);
  }, []);
  return (
    <div className="bg-green mx-auto relative">
      {/* hero section */}
      <HomeHeroSection />
      {/* how it does section */}
      <div className="h-20" id="howItDoes"></div>
      <UserGuide />

      {/* feedback */}
      <div></div>
      <Feedback />
    </div>
  );
};

export default LandingPage;
