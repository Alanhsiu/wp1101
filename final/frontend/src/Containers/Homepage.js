import Resume from "./Resume";
import Publish from "./Publish";
import Appbar from "./appBar";
import Body from "./Body";
import Register from "./Register";
import SignIn from "./SignIn";
import Profile from "./Profile";
import ResumeDetail from "./resumeDetail";
import CaseDetail from "./caseDetail";
import { message } from "antd";
import { useState, useEffect, React } from "react";
import { CssBaseline } from "@material-ui/core";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MainRoute } from '../Components/routes/mainRoute.js";
import { PrivateRoute } from '../Components/routes/privateRoute.js";
import { LoginRoute } from '../Components/routes/loginRoute.js";

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

const StyledPaper = styled(Paper)`
  padding: 2em;
  width: 60%;
`;

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
        duration: 30,
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
          <Route exact path="/">
            {signedIn ? <Redirect to="/body" /> : <Redirect to="signIn" />}
          </Route>
          <Route
            path="/signIn"
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
          <Route path="/resume" element={<Resume navigate={navigate} />} />
          <Route path="/publish" element={<Publish navigate={navigate} />} />
          <Route
            path="/resumeDetail/:pid"
            element={<ResumeDetail navigate={navigate} />}
          />
          <Route
            path="/caseDetail/:pid"
            element={<CaseDetail navigate={navigate} />}
          />
          <Route exact path="/profile">
            {signedIn ? <Profile navigate={navigate} /> : <Redirect to="/" />}{" "}
          </Route>
        </Routes>
      </Wrapper>
    </>
  );
}

export default Homepage;
