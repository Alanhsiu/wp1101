import React from 'react'
import { AppBar, Toolbar,Button } from '@material-ui/core'
import styled from 'styled-components';
//import Typography from '@material-ui/core/Typography';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import Title from '../Components/Title';
const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

function Appbar(props) {
  return (
    <AppBar position="fixed" color="inherit">
      <Title >
          <span onClick={() => props.navigate('/body')}>
          NTU Tutor Web
          </span>
    </Title>
    </AppBar>
  )
}

export default Appbar
