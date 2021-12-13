import React from 'react'
import { AppBar, Toolbar,Button } from '@material-ui/core'
import styled from 'styled-components';
//import Typography from '@material-ui/core/Typography';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

function Appbar(props) {
  const { addRegularMessage } = useScoreCard();

  // const handleClear = async () => {
  //   const {
  //     data: { message },
  //   } = await axios.delete('/api/clear-db');
  //   addRegularMessage(message);
  // };

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar className="toolbar">
        <div className="appbar-left">
          <span className="app-name" onClick={() => props.navigate('/')}>
          NTU Tutor Web
          </span>
        </div>
      </Toolbar>
      <Button variant="contained" color="secondary" onClick={() => props.navigate('/publish')}>
        Case Publish
      </Button>
      <Button variant="contained" color="secondary" onClick={() => props.navigate('/resume')}>
        Edit Resume
      </Button>
    </AppBar>
  )
}

export default Appbar
