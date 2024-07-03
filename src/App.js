import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [attempts, setAttempts] = useState(0);
  const [heading, setHeading] = useState('Guess a number between 1-10');
  const [isWin, setIsWin] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setGuess('');
    setMessage('');
    setNumber(Math.floor(Math.random() * 10) + 1);
    setAttempts(0);
    setHeading('5 Chances left');
    setIsWin(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess(); 
    }
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  };

  const handleOnFocus = () => {
    setMessage('');
    setGuess('');
  };

  const renderIcon = () => {
    if (gameStarted && isWin) {
      return (
        <div className='icon-class'>🎉</div>
      );
    } else if (gameStarted && attempts >= 5) {
      return (
        <div className='icon-class'>🤕</div>
      );
    }
  };

  const renderContent = () => {
    if (!gameStarted) {
      return (
        <button className='button-class' onClick={startGame}>Start the Game</button>
      );
    } else if (isWin) {
      return (
        <div>
          <button className='button-class' onClick={startGame}>Play Again</button>
        </div>
      );
    } else if (attempts >= 5) {
      return (
        <div>
          <button className='button-class' onClick={startGame}>Re-try</button>
        </div>
      );
    
    } else {
      return (
        <div>
        <input
          type="text"
          value={guess}
          onKeyDown={handleKeyPress}
          onChange={(e) => setGuess(e.target.value)}
          onFocus={handleOnFocus}
          placeholder="Please enter your guess"
        />
        <div className='Body-text'  >
          <button className='button-class' onClick={handleGuess}>Guess</button>
        </div>
        <p className='error-class'>{message}</p>
      </div>
      )
    }
  };

  const handleGuess = () => {
    if (guess < 1 || guess > 10) {
      setMessage('Please enter a number between 1 and 10.');
      return;
    }

    setAttempts(attempts + 1);

    if (attempts > 4) {
      setHeading('You Lost !!');
      setMessage(`You lost! The number was ${number}.`);
      return;
    }

    if (parseInt(guess) === number) {
      setIsWin(true);
      setHeading('You won !!');
      setMessage('Congratulations! You guessed it right.');
    } else {
      if (attempts === 4) {
        setHeading('You Lost !!');
      } else {
        setHeading(`${4 - attempts} Chances left`);
      }
     
      if (parseInt(guess) > number) {
        setMessage('Try a lower number.');
      } else {
        setMessage('Try a higher number.');
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="dagger">
            🪃
        </div>
        <div className="left-panel">
          <div className='Header-1'>Guess the Number</div>
          <div className="rules">
            <p className="rules-header">Rules</p>
            <p>1. Start the game</p>
            <p>2. Guess a number between 1-10</p>
            <p>3. You would get 5 chances to guess it right.</p>
            <p>4. Lost ? Replay</p>
            <p>5. Won ? Congrats 🎉!!</p>
          </div>
        </div>
        <div className="right-panel">
          <div className='right-panel-box'>
            {renderIcon()}
            <div className='Body-text'>{heading}</div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
