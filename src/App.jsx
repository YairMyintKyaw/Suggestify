import { useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import View from "./routes";
import {
  createUserDocumentFormAuth,
  onAuthStateChangedListener,
} from "./util/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./store/userSlice";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChangedListener(async (userAuth) => {
      if (userAuth) {
        const { email, uid, displayName } = userAuth;
        await createUserDocumentFormAuth(userAuth);

        const currentPath = window.location.pathname;
        const isFeedbacksRoute =
          currentPath.split("/")[2] === "feedbacks" ||
          currentPath.split("/")[1] === "give-feedback";
        dispatch(
          setUserInfo({
            displayName,
            email,
            uid,
          })
        );
        if (isFeedbacksRoute) return;
        nav("/home");
      } else {
        dispatch(
          setUserInfo({
            displayName: "",
            email: "",
            uid: "",
          })
        );
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <View />
      <Footer />
    </>
  );
};

export default App;
