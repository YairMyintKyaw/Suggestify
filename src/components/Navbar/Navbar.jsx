import { useRef, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ReactLogo from "/src/assets/images/logo.svg";
import "./style.css";
import { signOutUser } from "../../util/firebase";
import { useSelector } from "react-redux";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const userGuide = useRef(null);
  const feedback = useRef(null);
  const homeHeroSection = useRef(null);
  const nav = useNavigate();
  const userId = useSelector((state) => state.user.uid);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const scrollToHero = () => {
    homeHeroSection.current?.scrollIntoView({ behavior: "smooth" });
    setIsNavOpen(false);
  };
  const scrollToFeedback = () => {
    feedback.current?.scrollIntoView({ behavior: "smooth" });
    setIsNavOpen(false);
  };
  const scrollToUserGuide = () => {
    userGuide.current?.scrollIntoView({ behavior: "smooth" });
    setIsNavOpen(false);
  };

  const handleLogout = async () => {
    await signOutUser();
    nav("/get-started");
  };

  const handleNavOpen = () => {
    setIsNavOpen(true);
  };
  const handleNavClose = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      {!userId ? (
        <div className=" nav-container">
          <NavLink to={"/"}>
            <img src={ReactLogo} className="w-[150px]" onClick={scrollToHero} />
          </NavLink>
          <NavLink to={"/"} onClick={scrollToUserGuide} className="hideInSp">
            How it works
          </NavLink>
          <NavLink to={"/"} onClick={scrollToFeedback} className="hideInSp">
            Give Feedback
          </NavLink>
          <NavLink to={"/how-it-is-developed"} className="hideInSp">
            How it is developed
          </NavLink>
          <button className="border border-1 border-primary relative hover:border-green py-2  transition hideInSp">
            <NavLink to={"/get-started"} className="px-3">
              Get Started
            </NavLink>
          </button>
          <button className="md:hidden inline-block" onClick={handleNavOpen}>
            <CiMenuFries className="text-3xl text-primary" />
          </button>
        </div>
      ) : (
        <div className=" nav-container">
          <NavLink to={"/home"}>
            <img src={ReactLogo} className="w-[150px]" onClick={scrollToHero} />
          </NavLink>
          <button
            className="border border-1 border-primary relative hover:border-green py-2 px-3  transition"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
      {/* slide bar */}
      <div
        className={`nav-slider w-full pr-10 ps-0 pt-5 z-50 md:hidden overflow-hidden ${
          isNavOpen ? "translate-x-0" : "translate-x-[100vw]"
        } fixed top-0 bottom-0 right-0 my-auto bg-darkGreen flex flex-col transition-all duration-500 `}
      >
        <button className="text-4xl self-end mb-10" onClick={handleNavClose}>
          <RxCross1 />
        </button>
        <NavLink
          to={"/"}
          onClick={scrollToUserGuide}
          className={"nav-inSlider"}
        >
          How it works
        </NavLink>
        <NavLink to={"/"} onClick={scrollToFeedback} className={"nav-inSlider"}>
          Give Feedback
        </NavLink>
        <NavLink
          to={"/how-it-is-developed"}
          onClick={handleNavClose}
          className={"nav-inSlider"}
        >
          How it is developed
        </NavLink>
        <NavLink
          to={"/get-started"}
          className="nav-inSlider border border-s-0 border-primary bg-inherit"
          onClick={handleNavClose}
        >
          Get Started
        </NavLink>
      </div>
      <Outlet context={[userGuide, feedback, homeHeroSection]} />
    </>
  );
};

export default Navbar;
