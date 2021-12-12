import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

const Header = () => {
  const { addRegularMessage } = useScoreCard();

  // const handleClear = async () => {
  //   const {
  //     data: { message },
  //   } = await axios.delete('/api/clear-db');
  //   addRegularMessage(message);
  // };
  const handleClick1=()=>{

  }
  const handleClick2=()=>{

  }
  return (
    <Wrapper>
      <Typography variant="h2">NTU Tutor Web</Typography>
      <Button variant="contained" color="secondary" onClick={handleClick1}>
        Case Publish
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClick2}>
        Edit Resume
      </Button>
    </Wrapper>
  );
};

export default Header;