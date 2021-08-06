import React from 'react';

type Cards = {
  id: string;
  lang: string;
  correct: boolean;
};
interface Props {
  // eslint-disable-next-line no-unused-vars
  handleCardClick: (index: number) => void;
  card: Cards;
  index: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;
}

const FlipCard: React.FC<Props> = ({
  handleCardClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled
}) => {
  const handleClick = () => {
    console.log(index, 'handleClick');
    !isFlipped && handleCardClick(index);
  };
  console.log(isFlipped, 'isFlip');
  return (
    <button
      className={`card w-16 h-10 bg-secondary ${isFlipped && 'is-flipped'} ${
        isInactive && 'is-inactive'
      }`}
      disabled={isDisabled}
      onClick={handleClick}>
      <div className="card-face">Front</div>
      <div className="card-back-face">{card.lang}</div>
    </button>
  );
};

export default FlipCard;
