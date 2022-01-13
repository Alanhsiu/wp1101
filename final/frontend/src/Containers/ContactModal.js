import React from "react";
import { Form, Modal, Input } from "antd";
import { useState } from "react";

const ContactModal = ({ visible, onOk, onCancel }) => {
  const [name, setName] = useState("");

  return (
    <Modal
      visible={visible}
      title="Contact us"
      okText="Ok"
      cancelText="Back"
      onOk={onOk}
      onCancel={onCancel}
    >
      Please Call: 0974147414.
    </Modal>
  )
};

export default ContactModal;