import React, { useState, useEffect } from "react";
import instance from "../api";
import axios from "../api";
import { Button } from "@material-ui/core";
import { Delete as DeleteIcon, Send as SendIcon, Edit } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const ResumeDisplay = (props) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [lowPrice, setLowPrice] = useState();
  const [highPrice, setHighPrice] = useState();
  const [content, setContent] = useState("");
  const username = "temp"

  const handleQueryResume = async () => {
    const {
      data: { message },
    } = await axios.get("/api/query_resume", {
      params: {
        type: "name",
        username,
      },
    });
    const query = message;
    setName(query.name);
    setSubject(query.subject);
    setLowPrice(query.lowPrice);
    setHighPrice(query.highPrice);
    setContent(query.content);


  };
  useEffect(() => {
    handleQueryResume();
  }, []);


 


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
          ResumeDisplay
          <Edit 
          style={{
            fontWeight: "Bold",
            fontSize: 45,
            display: "flex",
            justifyContent: "center",
            paddingLeft:"15px",
            cursor: "pointer"
          }}
          onClick={() => props.navigate("/resumeEdit")}/>
        </div>
        <br />
        <Form
          className="post-subject"
          style={{
            display: "left",
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
            {name}
          </Form.Item>
          <Form.Item
            label="Subject"
            variant="outlined"
            className="post-subject"
            id="pid-create-subject"
          >
            {subject}
          </Form.Item>
          <Form.Item
            label="Wage (/hr)"
            variant="outlined"
            className="post-price"
            id="pid-create-price"
            multiline
            type="number"
          >
            {`${lowPrice} ~  ${highPrice} `}
          </Form.Item>
          <Form.Item
            label="Description"
            variant="outlined"
            className="post-experience"
            id="pid-create-experience"
            multiline
          >
           {content} 
          </Form.Item>
        </Form>

      </div>
    </div>
  );
};

export default ResumeDisplay
