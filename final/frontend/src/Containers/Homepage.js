import Resume from "./Resume";
import Publish from "./Publish";
import Appbar from "./appBar";
import Body from "./Body"
import SignIn from "./SignIn";
import { ScoreCardProvider } from "../hooks/useScoreCard";
import { message } from "antd";
import { useState, useEffect, useRef, React } from "react";
import { CssBaseline } from "@material-ui/core";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { Routes, Route, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;
//width is important
const LOCALSTORAGE_KEY = "save-me";


const StyledPaper = styled(Paper)`
  padding: 2em;
  width: 60%;

`;

function Homepage(props) {
  const navigate = useNavigate();

  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || "");
  const [username, setUsername] = useState(me);
  const [password, setPassword] = useState("")
  // const [body, setBody] = useState(""); // textBody
  // const bodyRef = useRef(null);
  const [signedIn, setSignedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 1,
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
    <CssBaseline/>
    <Wrapper>
      <Appbar navigate={navigate} />
          <Routes>
            <Route path="/" element={<SignIn navigate={navigate} 
              me={me}
              password={password}
              setMe={setMe}
              setPassword={setPassword}
              setSignedIn={setSignedIn}
              setRegistered={setRegistered}
              displayStatus={displayStatus}
            />} />
            <Route path="/body" element={<Body navigate={navigate} />} />
            <Route path="/resume" element={<Resume navigate={navigate} />} />
            <Route path="/publish" element={<Publish navigate={navigate} />} />
          </Routes>
    </Wrapper>
    </>
  );
}

export default Homepage;
