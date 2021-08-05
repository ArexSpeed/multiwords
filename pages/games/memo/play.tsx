import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import { useAppSelector } from 'redux/hooks';
import { selectMemoState } from 'redux/slices/gamesSlice';
import FlipCard from 'components/FlipCard';
import { words } from 'data';

type Word = {
  id: string;
  pol: string;
  eng: string;
}

const MemoPlay = () => {
  const memoState = useAppSelector(selectMemoState);
  const [cards, setCards] = useState<Word[]>([]);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    words
      .filter((word) => word.cat === 'Numbers')
      .map((word) => {
        setCards((prev) => [...prev, { id: word.id, pol: word.pol, eng: word.eng }]);
      });
      console.log(cards, 'cards');
  }, []);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };


  // const evaluate = () => {
  //   const [first, second] = openCards;
  //   enable();
  //   if (cards[first].type === cards[second].type) {
  //     setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
  //     setOpenCards([]);
  //     return;
  //   }
  //   // This is to flip the cards back after 500ms duration
  //   timeout.current = setTimeout(() => {
  //     setOpenCards([]);
  //   }, 500);
  // };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
  };

  return (
    <div className="w-screen h-auto min-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Link href="/games/memo" passHref>
          <button className="flex flex-row p-2 m-2 bg-primaryLight rounded-md dark:bg-primaryDark">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back</span>
          </button>
        </Link>
        <section className="flex flex-wrap justify-center items-center w-full">
          {cards.map((card, index) => (
            <FlipCard
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default MemoPlay;
