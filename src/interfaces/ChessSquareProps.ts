export interface ChessSquareProps {
  isDarkSquare: boolean;
  position: string;
  currentPosition: string;
  onAnswer: (answer: string) => void;
}
