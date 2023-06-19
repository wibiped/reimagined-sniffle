import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import ShareButton from './components/ShareButton';
import { ChessBoard } from './components/ChessBoard';
import ChallengeDisplay from './components/ChallengeDisplay';
import { Howl } from 'howler'

const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const positions = ranks.flatMap(rank => files.map(file => file + rank));

const correctSound = new Howl({
  src: ['correct.mp3'], // Replace with the path to your correct sound effect file
  volume: 0.5, // Set volume to 50%
});

const wrongSound = new Howl({
  src: ['wrong.mp3'], // Replace with the path to your wrong sound effect file
  volume: 0.5, // Set volume to 50%
});

function App() {
  const [isWhiteView, setIsWhiteView] = useState(true);
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [challengeCorrectCount, setChallengeCorrectCount] = useState(0);
  const [challengeWrongCount, setChallengeWrongCount] = useState(0);
  const [challengeStartTime, setChallengeStartTime] = useState(0); // unix timestamp

  const [targetPosition, setTargetPosition] = useState<string>(positions[Math.floor(Math.random() * positions.length)]);

  const [latestAnswer, setLatestAnswer] = useState('');

  function newTargetPos() {
    let newPosition = targetPosition;
    while (newPosition === targetPosition) {
      newPosition = positions[Math.floor(Math.random() * positions.length)];
    }
    setTargetPosition(newPosition);

  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (!isChallengeMode) {
      setChallengeStartTime(0);
      return;
    }

    setChallengeCorrectCount(0);
    setChallengeWrongCount(0);
    setChallengeStartTime(Date.now());

    timerId = setTimeout(() => {
      setIsChallengeMode(false);
    }, 30 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isChallengeMode])

  const handleAnswer = (answer: string) => {

    let isCorrect = answer === targetPosition;
    const sound = isCorrect ? correctSound : wrongSound;
    sound.play();

    if (isCorrect) {
      newTargetPos();
    }

    if (!isChallengeMode) return;

    // Increment the counter when a correct answer hits the chessboard
    if (isCorrect) {
      setChallengeCorrectCount(prevCounter => prevCounter + 1);
    } else {
      setChallengeWrongCount(prevCounter => prevCounter + 1);
    }
  };

  useEffect(() => {

    if (latestAnswer === null) return;
    if (latestAnswer === targetPosition) {
      newTargetPos();
      // let newPosition = targetPosition;
      // while (newPosition === targetPosition) {
      //   newPosition = positions[Math.floor(Math.random() * positions.length)];
      // }
      // setTargetPosition(newPosition);
    }

  }, [latestAnswer])

  useEffect(() => {
    setChallengeCorrectCount(0);
    setChallengeWrongCount(0);
  }, [isWhiteView])


  return (
    <>
      <div className={`flex flex-col items-center justify-center custom-h-screen`}
        style={{
          zIndex: 1, // Add a higher z-index value to the main div
        }}
      >
        <div
          style={{
            width: '90vw', maxWidth: 'calc(90vh - 15rem)'
          }}>

          <div className="flex flex-row items-center justify-center bg-white shadow-lg " >
            <div className='flex-grow'
              style={{
                width: '100%'
              }}
            >
              <ChallengeDisplay
                correctCount={challengeCorrectCount}
                wrongCount={challengeWrongCount}
                startTime={challengeStartTime}
              />
            </div>
            <button
              onClick={() => {
                newTargetPos();
                setIsChallengeMode(!isChallengeMode)
              }
              }
              className={`h-full p-3 italic bg-white text-black mx-2 `}
            >
              <span>
                {isChallengeMode ? 'stop' : 'start'}
              </span>
            </button>
          </div>

          <ChessBoard isWhiteView={isWhiteView} onAnswer={handleAnswer} targetPosition={targetPosition} />

          <div className="flex flex-row items-center justify-center space-x-4" >
            {/* button to flip the board */}
            <button
              onClick={() => setIsWhiteView(!isWhiteView)}
              className={`h-full flex-grow p-3 shadow-lg ${isWhiteView ? 'text-black' : 'text-white'}  ${isWhiteView ? 'bg-white' : 'bg-black'}`}
              style={{ width: '100%' }}
            >
              <span className="mr-1">
                {isWhiteView ? 'white' : 'black'}{' '}
              </span>
              &#x21BB;
            </button>
          </div>
        </div>
      </div >

      {/* background gradient */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            // background: '#736394',
            // background: '#312947',
            background: '#dad9df'
            // filter: 'brightness(100%) saturate(50%)', // Adjust brightness and saturation values as desired
            // opacity: 0.8, // Adjust the opacity as desired
          }}
        ></div>
      </div>


    </>
  );
}

export default App;
