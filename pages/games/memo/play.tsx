import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import { useAppSelector } from 'redux/hooks';
import { selectMemoState } from 'redux/slices/gamesSlice';
import FlipCard from 'components/FlipCard';
import { words } from 'data';

interface Words {
  correct: boolean;
  [key: string]: string;
}

type OpenCards = {
  index: number;
};

const shuffleCards = (array: Words[]) => {
  console.log(array, 'array shuffle')
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};

const MemoPlay = () => {
  const memoState = useAppSelector(selectMemoState);
  const [cardsOne, setCardsOne] = useState<Words[]>([]);
  const [cardsTwo, setCardsTwo] = useState<Words[]>([]);
  const [cards, setCards] = useState(() => shuffleCards(cardsOne.concat(cardsTwo)));
  const [openCards, setOpenCards] = useState<OpenCards[]>([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const timeout = null;
  const [points, setPoints] = useState(0);

  useEffect(() => {
    words
      .filter((word) => word.cat === 'Numbers')
      .map((word) => {
        setCardsOne((prev) => [...prev, { id: word.id, lang: word.pol, correct: false }]);
        setCardsTwo((prev) => [...prev, { id: word.id, lang: word.eng, correct: false }]);
      });
  }, []);

  useEffect(() => {
    setCards(() => shuffleCards(cardsOne.concat(cardsTwo)));
    console.log('pick');
  }, [cardsOne, cardsTwo]);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    console.log('evaluate', openCards);
    console.log(cards[first], 'card first');
    console.log(cards[second], 'card second');
    if (cards[first].id === cards[second].id) {
      console.log(cards[first], 'card first');
      console.log(cards[second], 'card second');
      setClearedCards((prev) => ({ ...prev, [cards[first].id]: true }));
      setOpenCards([]);
      setPoints((prev) => prev + 1);
      return;
    }
    // This is to flip the cards back after 500ms duration
    setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index: number) => {

    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      console.log(openCards, 'open Cards');
      disable();
    } else {
      //clearTimeout(timeout.current);
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

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.id]);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full min-h-screen">
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
              word={card}
              index={index}
              correct={card.correct}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          ))}
        </section>
        Points: {points}
      </main>
    </div>
  );
};

export default MemoPlay;
