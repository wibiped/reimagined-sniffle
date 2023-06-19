import React, { useState, useEffect } from 'react';
import { ChallengeDisplayProps } from '../interfaces/ChallengeDisplay';
import { Failure, Success } from './Icons';

export const ChallengeDisplay: React.FC<ChallengeDisplayProps> = ({ correctCount, wrongCount, startTime }) => {
  const [timer, setTimer] = useState(30);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    const currentTime = Date.now();
    const difference = Math.floor((currentTime - startTime) / 1000);

    if (difference >= 0 && difference <= 30) {
      setTimer(30 - difference);
    } else {
      setTimer(0);
    }

    if (startTime <= currentTime && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [startTime, timer]);

  useEffect(() => {
    if (timer === 0) {
      // Timer has reached 0, handle the end of the challenge
      // ...
    }
  }, [timer]);

  useEffect(() => {
    if (correctCount > 0) {
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false);
      }, 500); // Change the duration as per your preference
    }
  }, [correctCount]);

  useEffect(() => {
    if (wrongCount > 0) {
      setIncorrect(true);
      setTimeout(() => {
        setIncorrect(false);
      }, 500); // Change the duration as per your preference
    }
  }, [wrongCount]);

  return (
    <div className="flex flex-row items-center text-2xl text-offWhite">
      <div className={`flex-1 ml-4 transition-all duration-500 ${correct ? 'text-green-500 ' : ''}`}>
        +{correctCount}
      </div>
      <div className={`flex-1 ml-4 transition-all duration-500 ${incorrect ? 'text-red-300 ' : ''}`}>
        -{wrongCount}
      </div>

      {timer !== 0 && <div className="flex-1">{timer}s</div>}
    </div>
  );
};

export default ChallengeDisplay;
