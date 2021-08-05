import React from 'react';

const FlipCard = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };
  return (
    <button
      className={`card w-16 h-10 bg-secondary ${isFlipped && 'is-flipped'}`}
      onClick={handleClick}>
      <div className="card-face card-font-face">Front</div>
      <div className="card-face card-back-face">Back</div>
    </button>
  );
};

export default FlipCard;
