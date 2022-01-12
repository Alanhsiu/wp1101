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
import { Routes, Route, useNavigate } from "react-router-dom";

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
          <Route
            path="/"
            element={
              <SignIn
                navigate={navigate}
                me={me}
                setMe={setMe}
                username={username}
                setUserName={setUsername}
                password={password}
                setPassword={setPassword}
                setSignedIn={setSignedIn}
                setRegistered={setRegistered}
                displayStatus={displayStatus}
              />
            }
          />
          <Route path="/register" element={<Register navigate={navigate} />} />
          <Route path="/body" element={<Body navigate={navigate} />} />
          <Route
            path="/resumeDisplay"
            element={<ResumeDisplay navigate={navigate} />}
          />
          <Route
            path="/resumeEdit"
            element={<ResumeEdit navigate={navigate} />}
          />
          <Route path="/publish" element={<Publish navigate={navigate} />} />
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
          <Route
            path="/resumeDetail/:pid"
            element={<ResumeDetail navigate={navigate} />}
          />
          <Route
            path="/caseDetail/:pid"
            element={<CaseDetail navigate={navigate} />}
          />
          <Route path="/profile" element={<Profile navigate={navigate} />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default Homepage;
