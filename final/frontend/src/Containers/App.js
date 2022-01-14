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
  background-color: pink;
  background-attachment:scroll;
`;

function App(props) {
  document.title = "110-1 wpfinal";
  const navigate = useNavigate();

  const LOCALSTORAGE_KEY = "save-me";
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [id, setId] = useState(savedMe || "");
  const [me, setMe] = useState("");
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
    <>
      <Appbar navigate={navigate} />
      <CssBaseline />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="" element={<MainRoute />}>
            <Route
              path="/register"
              element={<Register navigate={navigate} me={me} />}
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
                  id={id}
                  setId={setId}
                  displayStatus={displayStatus}
                />
              }
            />
            {/* </Route>
          <Route path="" element={<PrivateRoute />}> */}
            <Route
              path="/body"
              element={<Body navigate={navigate} me={me} id={id} />}
            />
            <Route
              path="/publish"
              element={<Publish navigate={navigate} me={me} id={id} />}
            />
            <Route
              path="/resumeDetail/:pid"
              element={<ResumeDetail navigate={navigate} me={me} id={id} />}
            />
            <Route
              path="/caseDetail/:pid"
              element={<CaseDetail navigate={navigate} me={me} id={id} />}
            />
            <Route
              path="/resumeDisplay"
              element={<ResumeDisplay navigate={navigate} me={me} id={id} />}
            />
            <Route
              path="/resumeEdit"
              element={<ResumeEdit navigate={navigate} me={me} id={id} />}
            />
            <Route
              path="/chatroom"
              element={
                <ChatRoom
                  id={id}
                  navigate={navigate}
                  username={me}
                  displayStatus={displayStatus}
                />
              }
            />
          </Route>
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
