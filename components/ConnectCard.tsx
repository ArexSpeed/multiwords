import React, { useState } from 'react';

interface Props {
  index: string;
  word: string;
  lang: string;
  color: string;
}

const ConnectCard: React.FC<Props> = ({ index, word, lang, color }) => {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <button
      className={`bg-${lang} text-${color} flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm ${
        isCheck && 'border-2 border-green-400'
      }`}
      onClick={() => setIsCheck(!isCheck)}>
      {word}
    </button>
  );
};

export default ConnectCard;
