import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import { useAppSelector } from 'redux/hooks';
import { selectConnectState, selectConnectLanguages } from 'redux/slices/gamesSlice';
import { words } from 'data';

type Word = {
  id: string;
  [key: string]: string;
};
type WordCards = {
  id: string;
  word: string;
  correct: boolean;
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

const ConnectPlay = () => {
  const connectLanguages = useAppSelector(selectConnectLanguages);
  const connectState = useAppSelector(selectConnectState);
  const [isFinish, setIsFinish] = useState(false);
  const [cardsInit, setCardsInit] = useState<Word[]>([]);
  const [cardsShuffle, setCardsShuffle] = useState<Word[]>([]);
  const [cardsEng, setCardsEng] = useState<WordCards[]>([]);
  const [cardsPol, setCardsPol] = useState<WordCards[]>([]);
  const [cardsGer, setCardsGer] = useState<WordCards[]>([]);
  const [cardsNed, setCardsNed] = useState<WordCards[]>([]);
  const [cardsSpa, setCardsSpa] = useState<WordCards[]>([]);
  const [cardsFra, setCardsFra] = useState<WordCards[]>([]);
  const [cardsIta, setCardsIta] = useState<WordCards[]>([]);
  // Step 1. get selected words category
  useEffect(() => {
    words
      .filter((word) => word.cat === connectState.category)
      .map((word) => {
        setCardsInit((prev) => [
          ...prev,
          {
            id: word.id,
            eng: word.eng,
            pol: word.pol,
            ger: word.ger,
            ned: word.ned,
            spa: word.spa,
            fra: word.fra,
            ita: word.ita
          }
        ]);
      });
  }, [connectState.category]);

  //Step 2. shuffle all selected words
  useEffect(() => {
    setCardsShuffle(() => shuffleCards(cardsInit));
  }, [cardsInit]);

  //Step 3. Slice shuffled words to quantity of selected by user and map to all language
  useEffect(() => {
    const cardsSlice = cardsShuffle.slice(0, connectState.wordsQty);
    cardsSlice.map((word) => {
      setCardsEng((prev) => [...prev, { id: word.id, word: word.eng, correct: false }]);
      setCardsPol((prev) => [...prev, { id: word.id, word: word.pol, correct: false }]);
      setCardsGer((prev) => [...prev, { id: word.id, word: word.ger, correct: false }]);
      setCardsNed((prev) => [...prev, { id: word.id, word: word.ned, correct: false }]);
      setCardsSpa((prev) => [...prev, { id: word.id, word: word.spa, correct: false }]);
      setCardsFra((prev) => [...prev, { id: word.id, word: word.fra, correct: false }]);
      setCardsIta((prev) => [...prev, { id: word.id, word: word.ita, correct: false }]);
    });
  }, [cardsShuffle, connectState.wordsQty]);

  return (
    <div className="w-screen min-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full min-h-screen">
        <Link href="/games/connect" passHref>
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
            <section className="flex flex-row justify-start items-center w-full overflow-x-auto">
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.eng &&
                  shuffleCards(cardsEng).map((word) => (
                    <button
                      key={word.id}
                      className="bg-eng flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                      {word.word}
                    </button>
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.pol &&
                  shuffleCards(cardsPol).map((word) => (
                    <button
                      key={word.id}
                      className="bg-pol flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                      {word.word}
                    </button>
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.ger &&
                  shuffleCards(cardsGer).map((word) => (
                    <button
                      key={word.id}
                      className="bg-ger flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                      {word.word}
                    </button>
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.ned &&
                  shuffleCards(cardsNed).map((word) => (
                    <button
                      key={word.id}
                      className="bg-ned flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                      {word.word}
                    </button>
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.spa &&
                  shuffleCards(cardsSpa).map((word) => (
                    <button
                      key={word.id}
                      className="bg-spa text-black flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                      {word.word}
                    </button>
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.fra &&
                  shuffleCards(cardsFra).map((word) => (
                    <button
                      key={word.id}
                      className="bg-fra text-black flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                      {word.word}
                    </button>
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.ita &&
                  shuffleCards(cardsIta).map((word) => (
                    <button
                      key={word.id}
                      className="bg-ita flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                      {word.word}
                    </button>
                  ))}
              </div>
            </section>
          </>
        ) : (
          <section className="flex flex-col justify-center items-center w-full">
            <p>Amazing you found all words!!</p>
            <p>Now you can back to memo with other words</p>
            <Link href="/games/connect" passHref>
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

export default ConnectPlay;
