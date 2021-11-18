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
    let num = document.getElementById("numberInput").value;
    setNumber(num);
    const response = await guess(num);
    if (response === "Equal") setHasWon(true);
    else {
      setStatus(response);
      setNumber("");
    }
  };

  const handleRestart = async () => {
    await restart();
    setHasWon(false);
  };

  const startMenu = (
    <div>
      <button onClick={() => handleStart}> start game </button>
    </div>
  );

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input id="numberInput" type="text" value={number}>
        {number}
      </input>
      <button // Send number to backend
        onClick={() => handleGuess}
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
      <button onClick={() => handleRestart}>restart</button>
    </>
  );


  const game = <div>{hasWon ? winningMode : gameMode} </div>;

  return <div className="App"> {hasStarted ? game : startMenu}</div>;
}

export default App;
