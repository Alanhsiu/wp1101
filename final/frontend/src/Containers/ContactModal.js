import React from "react";
import { Modal } from "antd";

const ContactModal = ({ visible, onOk, onCancel }) => {

  return (
    <Modal
      visible={visible}
      title="Contact us"
      okText="Ok"
      cancelText="Back"
      onOk={onOk}
      onCancel={onCancel}
    >
      Please Call 0974147414
      or 
      Email to b09907414@ntu.edu.tw
    </Modal>
  )
};

export default ContactModal;