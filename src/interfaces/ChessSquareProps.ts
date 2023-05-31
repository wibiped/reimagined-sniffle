export interface ChessSquareProps {
  isDarkSquare: boolean;
  position: string;
  currentPosition: string;
  setLatestAnswer: (newPosition: boolean | null) => void;
}
