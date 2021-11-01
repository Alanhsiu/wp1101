/* eslint-disable no-eval */
import React, { useState } from "react";
import './App.css'
import Display from "./components/Display";

const App = () => {
  const [result, setResult] = useState("");
  const [memory, setMemory] = useState("0");
  const [restart, setRestart] = useState(false);

  const handClick=(e)=>{
      if(restart===true){
          setRestart(false)
          setResult(e.target.name)
      }
      else
        setResult(result.concat(e.target.name))
  }
  const clearAll =()=>{
    setResult("")
    setMemory("0")
    setRestart(false)
  }
  const del=()=>{
    setResult(result.slice(0,-1))
  }
  const ans=()=>{
      setRestart(true);
      try{
          setResult(eval(result).toString());
      }
      catch(err){
          setResult("Error");
      }
  }
  const factorial=()=>{
    setRestart(true);
    if((eval(result)%1)!==0)
        setResult("Not Integer")
    else{
        var ans=1;
        for(let i=1; i<=result; i++)
            ans*=i;
        setResult(ans.toString());
    }
  }
  const sqrt=(e)=>{
    setRestart(true);
    if(eval(result)<0)
        setResult("Non-Positive")
    else{
        setResult(eval(result.concat(e.target.name)).toString());
    }
  }
  const recallMemory=()=>{
    setResult(memory)
  }
  const clearMemory=()=>{
    setMemory("0")}

  const addMemory=()=>{
    setMemory((eval(memory)+eval(result)).toString())
    setRestart(true);
    setResult("")
  }
  const addNegtiveMemory=()=>{
    setMemory((eval(memory)+eval(result)*(-1)).toString())
    setRestart(true);
    setResult("")
  }
  return (
    <>
      <div className="container">
        <div className="keypad">
        <Display result={result}/>
        <button className="operator1" name="(" onClick={handClick} >(</button>
        <button className="operator1" name=")" onClick={handClick} >)</button>
        <button className="highlight" onClick={clearAll} id="clear">AC</button>
        <button className="highlight" onClick={del} id="del">DEL</button>
        <button className="operator1" name="%" onClick={handClick} >%</button>
        <button className="operator1" name="**" onClick={handClick} >**</button>
        <button className="highlight" onClick={recallMemory}>MR</button>
        <button className="highlight" onClick={clearMemory}>MC</button>
        <button className="operator1" name="!" onClick={factorial} >!</button>
        <button className="operator1" name="**0.5" onClick={sqrt} >&radic;</button>
        <button className="highlight" onClick={addMemory}>M+</button>
        <button className="highlight" onClick={addNegtiveMemory}>M-</button>
        <button className="operator" name="/"onClick={handClick}>&divide;</button>
        <button name="7"onClick={handClick}>7</button>
        <button name="8"onClick={handClick}>8</button>
        <button name="9"onClick={handClick}>9</button>
        <button className="operator" name="*"onClick={handClick}>&times;</button>
        <button name="4"onClick={handClick}>4</button>
        <button name="5"onClick={handClick}>5</button>
        <button name="6"onClick={handClick}>6</button>
        <button className="operator" name="-"onClick={handClick}>&minus;</button>
        <button name="1"onClick={handClick}>1</button>
        <button name="2"onClick={handClick}>2</button>
        <button name="3"onClick={handClick}>3</button>
        <button className="operator" name="+"onClick={handClick}>+</button>
        <button name="0"onClick={handClick} id="zero">0</button>
        <button name="."onClick={handClick}>.</button>
        <button className="operator" onClick={ans} id="ans">=</button>
        </div>
      </div>
    </>
  );
};

export default App;
