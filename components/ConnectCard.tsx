import React, { useState } from 'react';

interface Props {
  index: string;
  word: string;
  lang: string;
  color: string;
  checkIndex: string;
  // eslint-disable-next-line no-unused-vars
  setCheck: (index: string) => void;
}

const ConnectCard: React.FC<Props> = ({ index, word, lang, color, checkIndex, setCheck }) => {
  return (
    <button
      className={`bg-${lang} text-${color} flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm ${
        checkIndex === index && 'border-2 border-green-400'
      }`}
      onClick={() => setCheck(index)}>
      {word}
    </button>
  );
};

export default ConnectCard;
