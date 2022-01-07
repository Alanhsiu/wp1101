import React, { useState } from "react";
import instance from "../api";

import { Button, TextField } from "@material-ui/core";
import { Delete as DeleteIcon, Send as SendIcon } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";

const Publish = (props) => {
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState();
  const [experience, setExperience] = useState("");
  const [addition, setAddition] = useState("");
  const handleSubmit = async () => {
    const postId = uuidv4();
    if (subject.length > 0 && price > 0) {
      await instance.post("/publish", {
        postId,
        subject,
        price,
        experience,
        addition,
      });
    } 

    setTimeout(() => {
      props.navigate(-1);
    }, 300);
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
        <div
          className="post-subject"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <TextField
            label="Subject"
            variant="outlined"
            className="post-subject"
            id="pid-create-subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <TextField
            label="Price"
            variant="outlined"
            className="post-price"
            id="pid-create-price"
            multiline
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            label="Experience"
            variant="outlined"
            className="post-experience"
            id="pid-create-experience"
            multiline
            onChange={(e) => {
              setExperience(e.target.value);
            }}
          />
          <TextField
            label="Addition"
            variant="outlined"
            className="post-addition"
            id="pid-create-addition"
            multiline
            type="number"
            onChange={(e) => {
              setAddition(e.target.value);
            }}
          />
        </div>
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
