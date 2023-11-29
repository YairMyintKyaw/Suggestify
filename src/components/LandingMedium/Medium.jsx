import { useSelector } from "react-redux";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Home from "../../pages/Home/Home";

const Medium = () => {
  const user = useSelector((state) => state.user.uid);
  return <>{!user ? <LandingPage /> : <Home />}</>;
};

export default Medium;
