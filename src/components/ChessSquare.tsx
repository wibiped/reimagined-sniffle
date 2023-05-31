import React, { useState, useEffect } from 'react';
import { ChessSquareProps } from '../interfaces/ChessSquareProps';

const ChessSquare: React.FC<ChessSquareProps> = ({ isDarkSquare, position, currentPosition, setLatestAnswer }) => {
  const [squareState, setSquareState] = useState({ isClicked: false, isCorrect: false });

  useEffect(() => {
    if (squareState.isClicked) {
      const timerId = setTimeout(() => {
        setSquareState(prevState => ({ ...prevState, isClicked: false }));
      }, 500);

      // Clean up function to clear the timer if the component is unmounted before the timer fires
      return () => clearTimeout(timerId);
    }
  }, [squareState.isClicked]);

  const handleSquareClick = () => {
    const isCorrect = position === currentPosition;
    setSquareState({ isClicked: true, isCorrect });

    const audio = new Audio(isCorrect ? '/correct.mp3' : '/wrong.mp3');
    audio.volume = 0.5;  // set volume to 50%
    audio.play();

    setLatestAnswer(position);

  };

  const baseStyles = {
    opacity: '0.2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 1s ease-out'
  };

  const tintRed = isDarkSquare ? '#b71c1c' : '#f56565';  // Corresponding to bg-red-700 and bg-red-500
  const tintGreen = isDarkSquare ? '#2f855a' : '#48bb78';  // Corresponding to bg-green-700 and bg-green-500

  const darkGray = '#3C444C';
  const offWhite = '#F2F6FA';

  const isDarkSquareStyle = isDarkSquare
    ? { background: darkGray, color: offWhite }
    : { background: offWhite, color: darkGray }

  const isClickedStyle = squareState.isClicked
    ? { background: squareState.isCorrect ? tintGreen : tintRed }
    : {};

  const squareStyles = {
    ...baseStyles,
    ...isDarkSquareStyle,
    ...isClickedStyle
  };

  return (
    <div
      style={squareStyles}
      onClick={handleSquareClick}
    >
    </div >
  );
};

export default ChessSquare;
