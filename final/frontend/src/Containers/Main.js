import styled from "styled-components";
import { useState, useEffect, useRef, React } from "react";
import { message } from "antd";
import SignIn from "./SignIn";
import Homepage from "./Homepage";
import { ScoreCardProvider} from "../hooks/useScoreCard";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const LOCALSTORAGE_KEY = "save-me";

function Main() {
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
      {signedIn === false ? (
        <Wrapper className="App">
          <SignIn
            me={me}
            password={password}
            setMe={setMe}
            setPassword={setPassword}
            setSignedIn={setSignedIn}
            setRegistered={setRegistered}
            displayStatus={displayStatus}
          />
        </Wrapper>
      ) : (
        <ScoreCardProvider><Homepage /></ScoreCardProvider> 
      )}
    </>
  );
}

export default Main;
