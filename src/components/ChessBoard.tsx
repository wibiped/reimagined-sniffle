import React, { useState, useEffect, useRef } from 'react';

import { ChessBoardProps } from '../interfaces/ChessBoardProps';
import ChessSquare from './ChessSquare';

const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const positions = ranks.flatMap(rank => files.map(file => file + rank));

export const ChessBoard: React.FC<ChessBoardProps> = ({ isWhiteView }) => {
  const [latestAnswer, setLatestAnswer] = useState<string | null>(null);
  const [targetPosition, setTargetPosition] = useState<string>(positions[Math.floor(Math.random() * positions.length)]);
  const [chessboardSize, setChessboardSize] = useState(0);

  const chessboardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chessboardRef.current) {
      const chessboardWidth = chessboardRef.current.offsetWidth;
      setChessboardSize(chessboardWidth);
    }
  }, []);

  useEffect(() => {

    if (latestAnswer === null) return;
    if (latestAnswer === targetPosition) {
      let newPosition = targetPosition;
      while (newPosition === targetPosition) {
        newPosition = positions[Math.floor(Math.random() * positions.length)];
      }
      setTargetPosition(newPosition);
    }
  }, [latestAnswer])

  return (
    <>
      <div
        ref={chessboardRef}
        style={{
          width: '90vw',
          maxWidth: 'calc(90vh - 15rem)',
          height: '90vw',
          maxHeight: 'calc(90vh - 15rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)'
        }}
        className={`my-4 transform transition-transform duration-500 ${isWhiteView ? '' : 'rotate-180'}`}
      >
        {positions.map((position, index) => {
          const isDarkSquare = ((index % 8) + Math.floor(index / 8)) % 2 !== 0;
          return (
            <ChessSquare
              key={position}
              position={position}
              isDarkSquare={isDarkSquare}
              currentPosition={targetPosition}
              setLatestAnswer={setLatestAnswer}
            />
          )
        })}
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${chessboardSize / 3}px`,
        color: 'white',
        pointerEvents: 'none'
      }}>
        {targetPosition.toUpperCase()}
      </div>
    </>
  );
}