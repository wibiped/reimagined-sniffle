import React, { useState, useEffect } from 'react';
import { ChessSquareProps } from '../interfaces/ChessSquareProps';

const ChessSquare: React.FC<ChessSquareProps> = ({ isDarkSquare, position, currentPosition, setLatestAnswer }) => {
  const [squareState, setSquareState] = useState({ isClicked: false, isCorrect: false });

  // useEffect(() => {
  //   setSquareState({ isClicked: false, isCorrect: false });

  // }, [currentPosition]);

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

    setLatestAnswer(isCorrect);

  };

  /*
  const tintRed = isDarkSquare ? 'bg-red-700' : 'bg-red-500';
  const tintGreen = isDarkSquare ? 'bg-green-700' : 'bg-green-500';
  const isDarkSquareClass = isDarkSquare ? 'bg-darkGray text-offWhite' : 'bg-offWhite text-darkGray';
  const isClickedClass = squareState.isClicked ? (squareState.isCorrect ? tintGreen : tintRed) : '';
  const squareClassNames = [
    'flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'transition-all',
    'duration-500',
    'ease-in-out',
    isDarkSquareClass,
    isClickedClass
  ].join(' ');
  */


  const wrongAnimationClass = squareState.isClicked && !squareState.isCorrect ? 'animate-shake' : '';
  const correctAnimationClass = squareState.isClicked && squareState.isCorrect ? 'animate-spin' : '';


  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 1s ease-out'
  };

  const tintRed = isDarkSquare ? '#b71c1c' : '#f56565';  // Corresponding to bg-red-700 and bg-red-500
  const tintGreen = isDarkSquare ? '#2f855a' : '#48bb78';  // Corresponding to bg-green-700 and bg-green-500

  const isDarkSquareStyle = isDarkSquare
    ? { background: '#3C444C', color: '#F2F6FA' }
    : { background: '#F2F6FA', color: '#3C444C' };

  const isClickedStyle = squareState.isClicked
    ? { background: squareState.isCorrect ? tintGreen : tintRed }
    : {};

  const squareStyles = {
    ...baseStyles,
    ...isDarkSquareStyle,
    ...isClickedStyle
  };

  const squareClassNames = [
    wrongAnimationClass,
    correctAnimationClass
  ].join(' ');

  return (
    <div
      className={squareClassNames}
      style={squareStyles}
      onClick={handleSquareClick}
    >
      {/* {squareState.isClicked && position} */}
    </div >
  );
};

export default ChessSquare;
