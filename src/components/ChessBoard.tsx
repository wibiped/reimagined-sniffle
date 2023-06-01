import React, { useState, useEffect, useRef } from 'react';

import ChessSquare from './ChessSquare';
import { positions } from '../App';


export interface ChessBoardProps {
  isWhiteView: boolean;
  onAnswer: any;
  targetPosition: string;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ isWhiteView, onAnswer, targetPosition }) => {
  const [latestAnswer, setLatestAnswer] = useState<string | null>(null);
  const [chessboardSize, setChessboardSize] = useState(0);

  const chessboardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chessboardRef.current) {
      const chessboardWidth = chessboardRef.current.offsetWidth;
      setChessboardSize(chessboardWidth);
    }
  }, []);

  useEffect(() => {
    onAnswer(latestAnswer);
  }, [latestAnswer])

  return (
    <div
    >
      <div
        className={`my-4 `}
      >
        <div className={`transform transition-transform duration-500 ${isWhiteView ? '' : 'rotate-180'}`}
          ref={chessboardRef}
          style={{

            width: '90vw',
            maxWidth: 'calc(90vh - 15rem)',
            height: '90vw',
            maxHeight: 'calc(90vh - 15rem)',
            zIndex: 11,
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)'
          }}
        >
          {/* squares */}
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
        {/* overlay */}
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
      </div>
    </div>
  );
}