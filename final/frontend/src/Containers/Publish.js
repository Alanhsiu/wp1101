import React, { useState } from "react";
import instance from "../api";

import { Button, TextField } from "@material-ui/core";
import { Delete as DeleteIcon, Send as SendIcon } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const Publish = (props) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [lowPrice, setLowPrice] = useState();
  const [highPrice, setHighPrice] = useState();
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    const postId = uuidv4();
    const trimmed_content = content.trim();
    const timestamp = Math.floor(Date.now() / 1000);
    if (subject.length > 0 && lowPrice > 0 && highPrice > lowPrice) {
      await instance.post("/api/publish", {
        postId,
        name,
        subject,
        trimmed_content,
        lowPrice,
        highPrice,
        timestamp,
      });
    }

    setTimeout(() => {
      props.navigate(-1);
    }, 300);
  };
  const onGenderChange = (value) => {
    switch (value) {
      case "Math":
        setSubject("Math");
        return;
      case "English":
        setSubject("English");
        return;  
      case "Physics":
        setSubject("Physics");
        return;
      case "Chemistry":
        setSubject("Chemistry");
        return;   
      case "Geography":
        setSubject("Geography");
        return;
      default:
        setSubject("Others");
    }
  };

  return (
    <div className="post-wrapper">
      <div className="post-text-container">
        <div
          style={{
            fontWeight: "Bold",
            fontSize: 36,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Case Publish
        </div>
        <br />
        <Form
          className="post-subject"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            // alignItems: "center",
            margin: "auto",
          }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Name"
            variant="outlined"
            className="post-subject"
            id="pid-create-subject"
          >
            <Input
              style={{ width: "30%" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Subject"
            variant="outlined"
            className="post-subject"
            id="pid-create-subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          >
            <Select
              placeholder="select subject"
              onChange={onGenderChange}
              allowClear
              style={{ width: "30%" }}
            >
              <Option value="Math">Math</Option>
              <Option value="English">English</Option>
              <Option value="Physics">Physics</Option>
              <Option value="Chemistry">Chemistry</Option>
              <Option value="Geogrphy">Geography</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Wage (/hr)"
            variant="outlined"
            className="post-price"
            id="pid-create-price"
            multiline
            type="number"
          >
            <Input.Group compact>
              <Input
                style={{ width: "20%" }}
                onChange={(e) => {
                  setLowPrice(e.target.value);
                }}
                placeholder="Minimum"
              />
              &nbsp;&nbsp;
              <Input
                style={{ width: "20%" }}
                onChange={(e) => {
                  setHighPrice(e.target.value);
                }}
                placeholder="Maximum"
              />
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="Description"
            variant="outlined"
            className="post-experience"
            id="pid-create-experience"
            multiline
          >
            <Input.TextArea
              showCount
              maxLength={100}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
        <br />
        <div
          className="post-btn-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            className="post-btn"
            startIcon={<SendIcon />}
            id="pid-create-submit-btn"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="post-cancel-btn"
            endIcon={<DeleteIcon />}
            onClick={(e) => props.navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
