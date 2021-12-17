import Main from "./Main";
import Resume from "./Resume";
import Publish from "./Publish";
import Appbar from "./appBar";
import { ScoreCardProvider } from "../hooks/useScoreCard";

import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
//width is important
const StyledPaper = styled(Paper)`
  padding: 2em;
  width: 60%;
`;

function Homepage(props) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Appbar navigate={navigate} />
        <Routes>
          <Route path="/" element={<Main navigate={navigate} />} />
          <Route path="/resume" element={<Resume navigate={navigate} />} />
          <Route path="/publish" element={<Publish navigate={navigate} />} />
        </Routes>
      </StyledPaper>
    </Wrapper>
  );
}

export default Homepage;
