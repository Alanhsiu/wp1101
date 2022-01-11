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
import { useNavigate, Switch } from "react-router-dom";
import { MainRoute } from "../Components/routes/mainRoute.js";
import { PrivateRoute } from "../Components/routes/privateRoute.js";
import { LoginRoute } from "../Components/routes/loginRoute.js";

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
        <Switch>
          <MainRoute exact path="/">
            <Main navigate={navigate} />
          </MainRoute>
          <MainRoute exact path="/register">
            <Register navigate={navigate} />
          </MainRoute>
          <LoginRoute exact path="/login">
            <SignIn navigate={navigate} />
          </LoginRoute>
          <PrivateRoute exact path="/body">
            <Body navigate={navigate} />
          </PrivateRoute>
          <PrivateRoute exact path="/resume">
            <Resume navigate={navigate} />
          </PrivateRoute>
          <PrivateRoute exact path="/publish">
            <Publish navigate={navigate} />
          </PrivateRoute>
          <PrivateRoute exact path="/resumeDetail/:pid">
            <ResumeDetail navigate={navigate} />
          </PrivateRoute>
          <PrivateRoute exact path="/caseDetail/:pid">
            <CaseDetail navigate={navigate} />
          </PrivateRoute>
          <PrivateRoute exact path="/profile">
            <Profile navigate={navigate} />
          </PrivateRoute>
        </Switch>
      </Wrapper>
    </>
  );
}

export default Homepage;
