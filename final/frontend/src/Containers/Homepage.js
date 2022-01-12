import Publish from "./Publish";
import Appbar from "./appBar";
import Body from "./Body";
import Register from "./Register";
import SignIn from "./SignIn";
import Profile from "./Profile";
import ChatRoom from "./ChatRoom";
import ResumeDetail from "./resumeDetail";
import ResumeDisplay from "./ResumeDisplay";
import ResumeEdit from "./ResumeEdit";
import CaseDetail from "./caseDetail";
import { message } from "antd";
import { useState, useEffect, React } from "react";
import { CssBaseline } from "@material-ui/core";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { useNavigate, Routes, Route } from "react-router-dom";
import MainRoute from "../Components/routes/mainRoute.js";
import PrivateRoute from "../Components/routes/privateRoute.js";
import LoginRoute from "../Components/routes/loginRoute.js";

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
//width is important

function Homepage(props) {
  const navigate = useNavigate();
  const LOCALSTORAGE_KEY = "save-me";
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || "");
  const [username, setUsername] = useState(me);
  const [password, setPassword] = useState("");
  // const [body, setBody] = useState(""); // textBody
  // const bodyRef = useRef(null);
  const [signedIn, setSignedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 2,
      };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
      setUsername(me);
    }
  }, [signedIn, me]);

  return (
    <>
      <Appbar navigate={navigate} />
      <CssBaseline />
      <Wrapper>
        <Routes>
          <MainRoute
            exact
            path="/register"
            element={<Register navigate={navigate} />}
          />
          <LoginRoute
            exact
            path="/login"
            element={<SignIn navigate={navigate} />}
          />
          <PrivateRoute
            exact
            path="/body"
            element={<Body navigate={navigate} />}
          />
          <PrivateRoute
            exact
            path="/resume"
            element={<Resume navigate={navigate} />}
          />
          <PrivateRoute
            exact
            path="/publish"
            element={<Publish navigate={navigate} />}
          />
          <PrivateRoute
            exact
            path="/resumeDetail/:pid"
            element={<ResumeDetail navigate={navigate} />}
          />
          <PrivateRoute
            exact
            path="/caseDetail/:pid"
            element={<CaseDetail navigate={navigate} />}
          />
          <PrivateRoute
            exact
            path="/profile"
            element={<Profile navigate={navigate} />}
          />
        </Routes>
      </Wrapper>
    </>
  );
}

export default Homepage;
