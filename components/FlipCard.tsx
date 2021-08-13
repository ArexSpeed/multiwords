import React from 'react';
import Image from 'next/image';
import logo from 'assets/mwl.png';

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
  isCorrect: string;
}

const FlipCard: React.FC<Props> = ({
  handleCardClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
  isCorrect
}) => {
  const handleClick = () => {
    !isFlipped && handleCardClick(index);
  };

  const correctStyle = isCorrect === 'false' ? 'bg-red-500' : 'bg-primary';

  return (
    <button
      className={`card ${isInactive && 'is-inactive'} ${isFlipped && 'is-flipped'}`}
      disabled={isDisabled}
      onClick={handleClick}>
      <div className="card-front bg-secondary flex flex-row justify-center items-center">
        <div className="max-w-[50px] md:max-w-[80px]">
          <Image src={logo} alt="Multiwords" />
        </div>
      </div>
      <div className={`card-back ${correctStyle}`}>{card.lang}</div>
    </button>
  );
};

export default FlipCard;
