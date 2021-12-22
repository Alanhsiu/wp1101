import styled from "styled-components";
import { useState, useEffect, useRef, React } from "react";
import { message } from "antd";
import useChat from "../Hooks/useChat";
import ChatRoom from "./Chatroom";
import SignIn from "./SignIn";

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

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || "");
  const { status, messages, sendMessage, clearMessages } = useChat();
  const [username, setUsername] = useState(me);
  const [body, setBody] = useState(""); // textBody
  const bodyRef = useRef(null);
  const [signedIn, setSignedIn] = useState(false);
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
    displayStatus(status);
  }, [status]);
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
      setUsername(me);
    }
  }, [signedIn, me]);

  return (
    <Wrapper className="App">
      {signedIn === false ? (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      ) : (
        <ChatRoom
          messages={messages}
          clearMessages={clearMessages}
          sendMessage={sendMessage}
          username={username}
          setUsername={setUsername}
          body={body}
          bodyRef={bodyRef}
          setBody={setBody}
          displayStatus={displayStatus}
        />
      )}
    </Wrapper>
  );
}

export default App;