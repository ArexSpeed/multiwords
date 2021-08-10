import React from 'react';

interface Props {
  index: string;
  word: string;
  lang: string;
  color: string;
  checkIndex: string;
  // eslint-disable-next-line no-unused-vars
  setCheck: (index: string) => void;
  // eslint-disable-next-line no-unused-vars
  openCard: (index: string) => void;
  checkCorrect: string;
  isInactive: boolean;
}

const ConnectCard: React.FC<Props> = ({
  index,
  word,
  lang,
  color,
  checkIndex,
  setCheck,
  openCard,
  checkCorrect,
  isInactive
}) => {
  const handleClick = () => {
    setCheck(index);
    openCard(index);
  };

  const checkStyle =
    checkIndex === index && checkCorrect === 'wrong'
      ? 'bg-red-300'
      : checkIndex === index && checkCorrect === 'correct'
      ? 'bg-green-300'
      : '';

  return (
    <button
      className={`bg-${lang} text-${color} flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm ${
        checkIndex === index && 'border-2 border-green-400'
      } ${checkStyle} ${isInactive && 'bg-green-200 bg-opacity-20'}`}
      disabled={isInactive}
      onClick={handleClick}>
      {word}
    </button>
  );
};

export default ConnectCard;
