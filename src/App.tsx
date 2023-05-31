import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import ShareButton from './components/ShareButton';
import { ChessBoard } from './components/ChessBoard';

function App() {
  const [isWhiteView, setIsWhiteView] = useState(true);

  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen`}
        style={{
          zIndex: 1, // Add a higher z-index value to the main div
        }}
      >
        <ChessBoard isWhiteView={isWhiteView} />

        <div className="flex flex-row items-center justify-center space-x-4">
          <button
            onClick={() => setIsWhiteView(!isWhiteView)}
            className={`h-full w-full p-3 rounded-full ${isWhiteView ? 'bg-offWhite' : 'bg-darkGray'}  ${isWhiteView ? 'text-darkGray' : 'text-offWhite'}`}
          >
            <span>{isWhiteView ? 'white' : 'black'}{' '}</span>
            &#x21BB;
          </button>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `linear-gradient(45deg, #CFCFD8, #BDB5C9, #D8D2DA)`,
          filter: 'brightness(80%) saturate(350%)', // Adjust brightness and saturation values as desired
          animation: 'gradientAnimation 10s ease infinite',
          zIndex: -1,
        }}
      ></div>
    </>
  );
}

export default App;
