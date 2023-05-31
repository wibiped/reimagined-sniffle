export interface ChessSquareProps {
  isDarkSquare: boolean;
  position: string;
  currentPosition: string;
  setLatestAnswer: (latestAnswer: string) => void;
}
