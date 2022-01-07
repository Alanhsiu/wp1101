import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";
import { Button, Input, Tabs } from "antd";
import styled from "styled-components";
import Title from "../components/Title";
import ChatBox from "./ChatBox";
import ChatModal from "./ChatModal";
import useChatBox from "../Hooks/useChatBox";

const Wrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  paddding: 20px;
  display: flex;
`;

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [modalVisible, setModalVisible] = useState(false);

  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const addChatBox = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Title className="App-title">
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger>
          Clear
        </Button>
      </Title>
      <>
        <Wrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          //activeKey為目前顯示的chatBox
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          //Edit Table
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              //remove之後會回傳一個activeKey
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
        >
          {chatBoxes.map((friend) => (
            //對話窗
            <Tabs.TabPane tab={friend} closable={true} key={friend}>
              <ChatBox me={me} friend={friend} key={friend} />
            </Tabs.TabPane>
          ))}
        </Wrapper>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            console.log(name);
            await startChat({
              variables: {
                name1: me,
                name2: name,
              },
            });
            setActiveKey(createChatBox(name));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          }
          sendMessage({ name: me, body: msg });
          setMessageInput("");
        }}
      />
    </>
  );
};
export default ChatRoom;