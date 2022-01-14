import "./App.css";
import { useState, React } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { message } from "antd";
import { CssBaseline } from "@material-ui/core";
import styled from "styled-components";

import Publish from "./Publish";
import Appbar from "./appBar";
import Body from "./Body";
import Register from "./Register";
import SignIn from "./SignIn";
import Profile from "./Profile";
import ResumeDetail from "./resumeDetail";
import CaseDetail from "./caseDetail";
import MainRoute from "../Components/routes/mainRoute.js";
import PrivateRoute from "../Components/routes/privateRoute.js";
import LoginRoute from "../Components/routes/loginRoute.js";
import ResumeDisplay from "./ResumeDisplay";
import ResumeEdit from "./ResumeEdit";
import ChatRoom from "./ChatRoom";
import Home from "./Home";

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App(props) {
  document.title = "110-1 wpfinal";
  const navigate = useNavigate();

  const LOCALSTORAGE_KEY = "save-me";
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || "");
  const [password, setPassword] = useState("");
  const [signIn, setSignedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 3,
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
  return (
    <div style={{ backgroundColor: "PowderBlue" }}>
      <Appbar navigate={navigate} />
      <CssBaseline />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="" element={<MainRoute />}>
            <Route
              path="/register"
              element={<Register navigate={navigate} />}
            />
          </Route>
          <Route path="" element={<LoginRoute />}>
            <Route
              path="/login"
              element={
                <SignIn
                  navigate={navigate}
                  me={me}
                  setMe={setMe}
                  password={password}
                  setPassword={setPassword}
                  displayStatus={displayStatus}
                  setSignedIn={setSignedIn}
                  setRegistered={setRegistered}
                />
              }
            />
          </Route>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/body" element={<Body navigate={navigate} />} />
            <Route path="/publish" element={<Publish navigate={navigate} />} />
            <Route
              path="/resumeDetail/:pid"
              element={<ResumeDetail navigate={navigate} />}
            />
            <Route
              path="/caseDetail/:pid"
              element={<CaseDetail navigate={navigate} />}
            />
            <Route path="/profile" element={<Profile navigate={navigate} />} />
            <Route
              path="/resumeDisplay"
              element={<ResumeDisplay navigate={navigate} />}
            />
            <Route
              path="/resumeEdit"
              element={<ResumeEdit navigate={navigate} />}
            />
            <Route
              path="/chatroom"
              element={
                <ChatRoom
                  navigate={navigate}
                  username={me}
                  displayStatus={displayStatus}
                />
              }
            />
          </Route>
        </Routes>
      </Wrapper>
    </div>
  );
}

export default App;
