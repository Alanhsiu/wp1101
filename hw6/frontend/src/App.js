import "./App.css";
import { useState } from "react";
import { guess, startGame, restart } from "./axios";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleStart = async () => {
    const response = await startGame();
    setHasStarted(true);
    console.log(response);
  };

  const handleGuess = async () => {
    let num = document.getElementById("Input").value;
    // setNumber(num);
    const response = await guess(num);
    if (response === "Equal") setHasWon(true);
    else {
      setStatus(response);
      setNumber("");
    }
  };

  const handleRestart = async () => {
    const response = await restart();
    setHasWon(false);
    console.log(response);
  };

  const startMenu = (
    <div>
      <button onClick={handleStart}> start game </button>
    </div>
  );

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input id="Input" onChange={(e) => setNumber(e.target.value)}/>
      <button // Send number to backend
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  );
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
  );


  const game = <div>{hasWon ? winningMode : gameMode} </div>;

  return <div className="App"> {hasStarted ? game : startMenu}</div>;
}

export default App;
