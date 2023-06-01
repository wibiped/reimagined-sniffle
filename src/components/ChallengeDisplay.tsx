import React, { useState, useEffect } from 'react';
import { ChallengeDisplayProps } from '../interfaces/ChallengeDisplay';

export const ChallengeDisplay: React.FC<ChallengeDisplayProps> = ({ correctCount, wrongCount, startTime }) => {
  const [timer, setTimer] = useState(30);

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
  return (
    <div className="flex flex-row items-center text-xl">
      <div className="flex-1">
        ✅ {correctCount}
      </div>
      <div className="flex-1">
        ❌ {wrongCount}
      </div>

      {timer !== 0 &&
        <div className="flex-1">
          ⏰ {timer}
        </div>
      }
    </div>
  );
};

export default ChallengeDisplay;

