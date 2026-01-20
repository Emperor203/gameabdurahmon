import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { initGame, startGame, handleEvent } from './gameLogic'; // Логику вынесем отдельно

function App() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, ENDED
  const gameContainerRef = useRef(null);

  useEffect(() => {
    // Инициализация при первой загрузке
    initGame(gameContainerRef.current, setScore, setGameState);
    
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.type === 'mousedown') {
        if (gameState === 'START' || gameState === 'ENDED') {
          startGame();
          setGameState('PLAYING');
        } else {
          handleEvent();
        }
      }
      if (e.key.toLowerCase() === 'r') {
        startGame();
        setGameState('PLAYING');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleKeyDown);
    };
  }, [gameState]);

  return (
    <div className="app-container">
      {/* Слой с игрой */}
      <div ref={gameContainerRef} className="game-canvas" />

      {/* Интерфейс на React */}
      <div id="score">{score}</div>

      {gameState === 'START' && (
        <div className="overlay">
          <div className="content">
            <p>Складывайте блоки друг на друга</p>
            <p>Кликайте или жмите пробел, чтобы начать</p>
          </div>
        </div>
      )}

      {gameState === 'ENDED' && (
        <div className="overlay">
          <div className="content">
            <p>Промахнулся!</p>
            <p>Нажми <b>R</b> чтобы начать заново</p>
          </div>
        </div>
      )}

      <a id="skillshare" target="_blank" href="https://skl.sh/3uREVvq" rel="noreferrer">
        Проект Абдурахмона
      </a>
    </div>
  );
}

export default App;