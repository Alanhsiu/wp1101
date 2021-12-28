import React from "react";
import { Form, Modal, Input } from "antd";
import { useState } from "react";

const ChatModal = ({ visible, onCreate, onCancel }) => {
  const [name, setName] = useState("");

  return (
    <Modal
      visible={visible}
      title="Create Chatbox"
      okText="Create"
      cancelText="Cancel"
      onOk={()=>onCreate({name})}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item name="to" label="To">
          <Input
            placeholder="Type name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default ChatModal;