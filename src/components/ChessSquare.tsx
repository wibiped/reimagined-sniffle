import React, { useState, useEffect } from 'react';
import { ChessSquareProps } from '../interfaces/ChessSquareProps';

const ChessSquare: React.FC<ChessSquareProps> = ({ isDarkSquare, position, currentPosition, onAnswer }) => {
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
    onAnswer(position);
  };

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 1s ease-out'
  };

  const baseOpacity = 0.15; // Adjust this value to tweak the opacity of dark and light colors
  const tintOpacity = 0.4; // Adjust this value to tweak the opacity of green and red colors
  const greenOpacity = 1.0; // Adjust this value to tweak the opacity of green and red colors

  const tintRed = isDarkSquare ? `rgba(183, 28, 28, ${tintOpacity})` : `rgba(245, 101, 101, ${tintOpacity})`; // Corresponding to bg-red-700 and bg-red-500
  // const tintGreen = isDarkSquare ? `rgba(47, 133, 90, ${greenOpacity})` : `rgba(72, 187, 120, ${greenOpacity})`; // Corresponding to bg-green-700 and bg-green-500
  const tintGreen = `rgba(72, 187, 120, ${greenOpacity})`; // Corresponding to bg-green-700 and bg-green-500

  // const darkGray = `rgba(90, 98, 106, ${baseOpacity})`;
  // const offWhite = `rgba(242, 246, 250, ${baseOpacity})`;

  const darkGray = '#e6e6e6'
  const offWhite = '#fff'

  const isDarkSquareStyle = isDarkSquare
    ? { background: darkGray, color: offWhite }
    : { background: offWhite, color: darkGray };

  const isClickedStyle = squareState.isClicked
    ? { background: squareState.isCorrect ? tintGreen : tintRed }
    : {};

  const squareStyles = {
    ...baseStyles,
    ...isDarkSquareStyle,
    ...isClickedStyle
  };

  return (
    <div style={squareStyles} onClick={handleSquareClick}></div>
  );
};

export default ChessSquare;

