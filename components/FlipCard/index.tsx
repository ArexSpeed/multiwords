import React from 'react';

type Word = {
  [key: string]: string;
};
interface Props {
  onClick: (index) => void;
  word: Word;
  index: number;
  isInactive: boolean;
  isFlipped: boolean;
}

const FlipCard: React.FC<Props> = ({ onClick, word, index, isInactive, isFlipped }) => {
  const handleClick = () => {
    console.log(index, 'handleClick');
    !isFlipped && onClick(index);
  };
  console.log(isFlipped, 'isFlip');
  return (
    <button
      className={`card w-16 h-10 bg-secondary ${isFlipped && 'is-flipped'} ${
        isInactive && 'is-inactive'
      }`}
      onClick={handleClick}>
      <div className="card-face">Front</div>
      <div className="card-back-face">{word.lang}</div>
    </button>
  );
};

export default FlipCard;
