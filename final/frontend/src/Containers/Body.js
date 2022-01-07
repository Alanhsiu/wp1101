import { useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ScoreCardProvider} from "../hooks/useScoreCard";

import { useStyles } from "../hooks";
import axios from "../api";
import { useScoreCard } from "../hooks/useScoreCard";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;


const Body = (props) => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState();

  const [queryType, setQueryType] = useState("name");
  const [queryString, setQueryString] = useState("");
  const [tabType, setTab] = useState("Resume");
  const [queries,setQueries] = useState([])
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleNumber = (func) => (event) => {
    if(event.target.value>=0)
      {func(event.target.value)}
    else
    {func(0);}
  };
  const handleChange = (func) => (event) => {
    func(event.target.value)
  };

  useEffect(() => {
    // refresh();
    const refresh = async () => {
      if(tabType === "Resume")
      {console.log(await axios.get("/api/query-all"));
      const {
        data: { message, data },
      } = await axios.get("/api/query-all");
      console.log(data)
      console.log(message)
      setQueries(data)
    }
      else
      {console.log(await axios.get("/api/query-all"));
      const {
        data: { message, data },
      } = await axios.get("/api/query-all");
      console.log(data)
      console.log(message)
      setQueries(data)
      }
    };
    refresh();
  }, []);

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post("/api/create-card", {
      name,
      subject,
      price,
    });
    setQueries(card)
    if (!card) addErrorMessage(message);
    else addCardMessage(message); 
  };

  const handleQuery = async () => {
    const {
      data: { message },
    } = await axios.get("/api/query-cards", {
      params: {
        type: queryType,
        queryString,
      },
    }
    );
    console.log(message)
    setQueries(message)
    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
  };
  //subject price region
  return (
    <ScoreCardProvider>
    <div className="board-navbar">
        <Button variant="contained" color="secondary" onClick={() => props.navigate('/publish')}>
          Case Publish
        </Button>
        <Button variant="contained" color="secondary" onClick={() => props.navigate('/resume')}>
          Edit Resume
        </Button>
    </div>
    <Wrapper>
      <Tabs
        variant="fullWidth"
        value={tabType}
        onChange={(event, newTab) => {
          setTab(newTab);
        }}
      >
        <Tab label="Find Teachers" value="Resume" id="add" />
        <Tab label="Find Cases" value="Find" id="query" />
      </Tabs>
      {tabType==="Resume"?
      <Row style={{ height: "50px" }}>
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Lowest Price"
          value={price}
          onChange={handleNumber(setPrice)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          SEARCH
        </Button>
      </Row>:
      <Row style={{ height: "50px" }}>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Type here..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>}
      <br/>
      <div className="board-discuss-container">
          <div className="articles-container">
            {queries.map((post, i) => (
              <div className="article-post" key={i} id={`pid-${i}`}>
                <div className="article-prefix">
                  <span className="each-tag">【queries】</span> &nbsp;
                  <span
                    className="each-id"
                    id={`pid-${i}-title`}
                    onClick={() => props.navigate('/publish')}
                  >
                    {post.name}
                  </span>
                </div>
                
              </div>
            ))}
          </div>
      </div>

    </Wrapper>
    </ScoreCardProvider> 

  );
};

export default Body;
