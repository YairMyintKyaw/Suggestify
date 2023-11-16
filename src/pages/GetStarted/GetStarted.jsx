import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import Typed from "typed.js";
import "./style.css";
import {
  getGoogleRedirectResult,
  signInWithGoogleRedirect,
} from "../../util/firebase";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

const GetStarted = () => {
  const type = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogleRedirect().then(() => {
      setIsLoading(true);
    });
  };

  useEffect(() => {
    const typed = new Typed(type.current, {
      strings: ["Suggestify"],
      typeSpeed: 100,
      backDelay: 1500,
    });
    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <>
      {!isLoading ? (
        <div className="h-[90vh] flex items-center lg:justify-between justify-center flex-col lg:flex-row gap-10 lg:gap-0 md:px-10">
          <div className="text-5xl md:text-8xl leading-tight font-helvetica_compressed">
            <div>Get Started</div>
            <h1 className="inline-block w-fit " ref={type}></h1>
          </div>
          <button
            className="flex items-center gap-4 text-4xl md:text-6xl font-helvetica_compressed border border-primary
        rounded-full p-6 hover:border-green"
            onClick={handleSignIn}
          >
            <span>Continue with google</span>
            <FcGoogle />
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default GetStarted;
