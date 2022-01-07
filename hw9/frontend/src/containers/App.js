import ChatRoom from "./Chatroom";
import SignIn from "./SignIn";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { message } from "antd";
// import useChat from "../Hooks/useChat";

const LOCALSTORAGE_KEY = "save-me";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");
  // const { status, messages, sendMessage, clearMessages } = useChat();
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
  // useEffect(() => {
  //   displayStatus(status);
  // }, [status]);
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);

  return (
    <Wrapper>
      {signedIn ? (
        <ChatRoom
          // messages={messages}
          // clearMessages={clearMessages}
          // sendMessage={sendMessage}
          me={me}
          displayStatus={displayStatus}
        />
      ) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </Wrapper>
  );
};

export default App;