import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import { useAppSelector } from 'redux/hooks';
import { selectMemoState, selectMemoPlayers } from 'redux/slices/gamesSlice';
import FlipCard from 'components/FlipCard';
import { words } from 'data';

type CardInit = {
  id: string;
  lang1: string;
  lang2: string;
};
type Cards = {
  id: string;
  lang: string;
  correct: boolean;
};
type WordKey = {
  [key: string]: string;
};
type ObjectKey = {
  [key: string]: boolean;
};
type PlayersType = {
  id: string;
  name: string;
  points: number;
};

const shuffleCards = (array: Array<any>) => {
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
  const players = useAppSelector(selectMemoPlayers);
  const [cardsInit, setCardsInit] = useState<CardInit[]>([]);
  const [cardsShuffle, setCardsShuffle] = useState<CardInit[]>([]);
  const [cardsOne, setCardsOne] = useState<Cards[]>([]);
  const [cardsTwo, setCardsTwo] = useState<Cards[]>([]);
  const [cards, setCards] = useState<Cards[]>([]);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<ObjectKey>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [isCorrect, setIsCorrect] = useState<string>('');
  const [points, setPoints] = useState(0);
  const [playersPoints, setPlayersPoints] = useState<PlayersType[]>([]);
  const [playerMoveId, setPlayerMoveId] = useState(0);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    for (let i = 0; i < memoState.playersQty; i++) {
      setPlayersPoints((prev) => [
        ...prev,
        {
          id: players[i].id,
          name: players[i].name,
          points: 0
        }
      ]);
    }
  }, [memoState.playersQty, players]);

  // Step 1. get selected words (in 2 langs) from data words
  useEffect(() => {
    const langFirst = memoState.firstLang;
    const langSecond = memoState.secondLang;
    words
      .filter((word) => word.cat === memoState.category)
      .map((word: WordKey) => {
        setCardsInit((prev) => [
          ...prev,
          { id: word.id, lang1: word[langFirst], lang2: word[langSecond] }
        ]);
      });
  }, [memoState.firstLang, memoState.secondLang, memoState.category]);

  //Step 2. shuffle all selected words
  useEffect(() => {
    setCardsShuffle(() => shuffleCards(cardsInit));
  }, [cardsInit]);

  //Step 3. Slice shuffled words to quantity of selected by user and map these for 2 array of cards for every language
  useEffect(() => {
    const cardsSlice = cardsShuffle.slice(0, memoState.wordsQty);
    cardsSlice.map((word) => {
      setCardsOne((prev) => [...prev, { id: word.id, lang: word.lang1, correct: false }]);
      setCardsTwo((prev) => [...prev, { id: word.id, lang: word.lang2, correct: false }]);
    });
  }, [cardsShuffle, memoState.wordsQty]);

  // Step 4. shuffle and concat words from both language
  useEffect(() => {
    setCards(() => shuffleCards(cardsOne.concat(cardsTwo)));
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
    if (cards[first].id === cards[second].id) {
      setClearedCards((prev) => ({ ...prev, [cards[first].id]: true }));
      setOpenCards([]);
      playersPoints[playerMoveId].points += 1;
      setPoints((prev) => prev + 1);
      return;
    } else {
      setIsCorrect('false');
    }
    // This is to flip the cards back after 500ms duration
    setTimeout(() => {
      setOpenCards([]);
      setIsCorrect('');
      nextMove(playerMoveId);
    }, 500);
  };
  const handleCardClick = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disable();
    } else {
      //clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const nextMove = (currentPlayer: number) => {
    if (currentPlayer < memoState.playersQty - 1) {
      setPlayerMoveId((prev) => prev + 1);
    } else {
      setPlayerMoveId(0);
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 700);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  //Step 6. finisg game when board is empty (cardsOne half of all cards on board == founded cards)
  useEffect(() => {
    if (cardsOne.length > 1 && Object.keys(clearedCards).length === cardsOne.length) {
      setIsFinish(true);
    }
  }, [clearedCards, cardsOne]);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: Cards) => {
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
        {!isFinish ? (
          <>
            <section className="flex justify-center items-center w-full">
              <span>Current player:</span>
              <span className="text-lg mx-2">{playersPoints[playerMoveId]?.name}</span>
              <span>{`(${playersPoints[playerMoveId]?.points}pts)`}</span>
            </section>
            <section className="flex flex-wrap justify-center items-center w-full">
              {cards.map((card, index) => (
                <FlipCard
                  key={index}
                  card={card}
                  index={index}
                  isInactive={checkIsInactive(card)}
                  isFlipped={checkIsFlipped(index)}
                  isDisabled={shouldDisableAllCards}
                  handleCardClick={handleCardClick}
                  isCorrect={isCorrect}
                />
              ))}
            </section>
            <section className="flex flex-col justify-center items-center w-full">
              <div>
                Points: <span className="text-[10px]">{points}</span>
              </div>
              {playersPoints.map((player) => (
                <div key={player.id}>
                  {player.name} : {player.points}
                </div>
              ))}
            </section>
          </>
        ) : (
          <section className="flex flex-col justify-center items-center w-full">
            <p>Amazing you found all words!!</p>
            <p>Now you can back to memo with other words</p>
            <p>Score table:</p>
            {playersPoints
              .sort((a, b) => b.points - a.points)
              .map((player, i) => (
                <div key={player.id}>
                  {i + 1}. <span className="text-lg mx-2">{player.name}</span> {player.points}pts
                </div>
              ))}
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
          </section>
        )}
      </main>
    </div>
  );
};

export default MemoPlay;
