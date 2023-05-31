import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import ChessSquare from './components/ChessSquare';
import ShareButton from './components/ShareButton';

const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const positions = ranks.flatMap(rank => files.map(file => file + rank));

function App() {
  const [currentPosition, setCurrentPosition] = useState<string>(positions[Math.floor(Math.random() * positions.length)]);
  const [isWhiteView, setIsWhiteView] = useState(true);
  const [hecklerEnabled, setHecklerEnabled] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [prevTime, setPrevTime] = useState(Date.now());
  const [score, setScore] = useState(0);
  const [scoreDelta, setScoreDelta] = useState(0);
  const [latestAnswer, setLatestAnswer] = useState<boolean | null>(null);

  const insults = [
    "You suck!",
    "You're a loser!",
    "You're hopeless!",
    "You're a failure!",
    "You're fat!",
    "You're so slow, snails outrun you!",
    "If brains were dynamite, you wouldn't have enough to blow your nose!",
    "I'd challenge you to a battle of wits, but I see you're unarmed!",
    "You're the reason we have warning labels!",
    "If stupidity were a sport, you'd be a gold medalist!",
    "You're as useful as a screen door on a submarine!",
    "You bring a whole new meaning to the word 'clueless'!",
    "I'm trying to see things from your perspective, but I can't get my head that far up my rear end!",
    "You're so clumsy, you could trip over a wireless network!",
    "You're like a dictionary – you add meaning to my life... by being completely pointless!",
    "If ignorance is bliss, you must be the happiest person on Earth!",
    "You must have been born on a highway because that's where most accidents happen!",
    "You're the reason the gene pool needs a lifeguard!",
    "Are you a bank loan? Because you have no interest!",
    "You're so uncool, even ice cubes are jealous of you!",
    "If you had a dollar for every brain cell, you'd still be broke!",
    "I'm not saying you're dumb, but you'd have to climb a ladder to reach the bottom of the IQ chart!",
  ];
  function getRandomInsult() {
    const randomIndex = Math.floor(Math.random() * insults.length);
    return insults[randomIndex];
  }


  /*
  useEffect(() => {
    if ('speechSynthesis' in window) {

      let msg;
      if (scoreDelta < 0) {
        if (!hecklerEnabled) return;
        msg = getRandomInsult();
      } else {
        msg = currentPosition.toUpperCase();
      }
      let utter = new SpeechSynthesisUtterance(msg);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }, [score])
  */

  useEffect(() => {
    if (latestAnswer === null) return;
    if (latestAnswer === true) {

      const timeTaken = Date.now() - prevTime; // in milliseconds
      const scoreForThisAnswer = Math.ceil(Math.max(1000 - (timeTaken / 10), 100));

      setScoreDelta(scoreForThisAnswer);
      setScore(score + scoreForThisAnswer);
      setPrevTime(Date.now());
      setCorrectCount(correctCount + 1);
      setCurrentPosition(() => positions[Math.floor(Math.random() * positions.length)]);
      setLatestAnswer(null);
    } else {
      setScoreDelta(-1 * Math.abs(score))
      setScore(0);
      setLatestAnswer(null);
    }

  }, [latestAnswer]);

  const resetGame = () => {
    setCorrectCount(0);
    setScore(0);
    setScoreDelta(0);
    setPrevTime(Date.now())
    setCurrentPosition(() => positions[Math.floor(Math.random() * positions.length)]);
  }

  const handleHecklerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHecklerEnabled(event.target.checked);
  };


  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-1000`}
      style={{
        // background: `linear-gradient(45deg, #C9CDD8, #BDAFC9, #D8D2DA)`,
        background: `linear-gradient(45deg, #CFCFD8, #BDB5C9, #D8D2DA)`,

        backgroundSize: '200% 200%',
        animation: 'gradientAnimation 10s ease infinite'
      }}
    >
      <div
        style={{
          width: '90vw',
          maxWidth: 'calc(90vh - 15rem)',

        }}
      >
        <div className={'flex flex-row w-full px-4'}>
          <div className={'flex flex-col justify-end'}>
            <div className={'flex flex-row'}>
              <div className="mr-1">{correctCount} / </div>
              <div className="">{score}</div>
              {scoreDelta !== 0 &&
                <div className={`h-full flex-1 text-sm ${scoreDelta < 0 ? 'text-red-800' : 'text-green-800'}`}>
                  {scoreDelta < 0 ? '-' : '+'}{Math.abs(scoreDelta)}
                </div>
              }
            </div>
          </div>
          <span className="pl-4 flex-1 text-xl text-center">Click on: <strong>{currentPosition}</strong></span>
        </div>
        <div
          style={{
            height: '90vw',
            maxHeight: 'calc(90vh - 15rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)'
          }}
          className={`my-4 w-full h-full transform transition-transform duration-500 ${isWhiteView ? '' : 'rotate-180'}`}
        >
          {positions.map((position, index) => {
            const isDarkSquare = ((index % 8) + Math.floor(index / 8)) % 2 !== 0;
            return (
              <ChessSquare
                key={position}
                position={position}
                isDarkSquare={isDarkSquare}
                currentPosition={currentPosition}
                setLatestAnswer={setLatestAnswer}
              />
            )
          })}
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <button
            onClick={() => setIsWhiteView(!isWhiteView)}
            className={`h-full w-full p-3 rounded-full ${isWhiteView ? 'bg-offWhite' : 'bg-darkGray'}  ${isWhiteView ? 'text-darkGray' : 'text-offWhite'}`}
          >
            <span>{isWhiteView ? 'white' : 'black'}{' '}</span>
            &#x21BB;
          </button>
          <div className="flex-1 h-full">
            <ShareButton url={'a1h8.io'} />
          </div>
        </div>
        {/* <div className="text-center absolute top-0 left-0 w-full text-lg font-bold">a1h8.io</div> */}
        {/* <div className="mt-4 flex flex-col">
          <label>
            <input
              className="mr-2"
              type="checkbox"
              checked={hecklerEnabled}
              onChange={handleHecklerChange}
            />
            Heckler
          </label>

        </div> */}

      </div>
    </div>
  );
}

export default App;
