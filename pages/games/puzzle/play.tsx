import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import { useAppSelector } from 'redux/hooks';
import { selectPuzzleState } from 'redux/slices/gamesSlice';
import { UserLanguage } from 'redux/slices/settingsSlice';
import { words } from 'data';

type CardInit = {
  id: string;
  lang1: string;
  lang2: string;
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

const PuzzlePlay = () => {
  const puzzleState = useAppSelector(selectPuzzleState);
  const userLang = useAppSelector(UserLanguage);
  const [cardsInit, setCardsInit] = useState<CardInit[]>([]);
  const [cardsShuffle, setCardsShuffle] = useState<CardInit[]>([]);
  const [word, setWord] = useState<CardInit>();
  const [wordShuffle, setWordShuffle] = useState<string[]>([]);

  useEffect(() => {
    const lang = puzzleState.language;
    words
      .filter((word) => word[lang].length === puzzleState.lettersQty)
      .map((word) => {
        setCardsInit((prev) => [
          ...prev,
          { id: word.id, lang1: word[userLang.short], lang2: word[lang] }
        ]);
      });
  }, [puzzleState, userLang]);

  //Step 2. shuffle all selected words
  useEffect(() => {
    setCardsShuffle(() => shuffleCards(cardsInit));
  }, [cardsInit]);

  //Step 2. shuffle all selected words
  useEffect(() => {
    setWord(cardsShuffle[0]);
  }, [cardsShuffle]);

  useEffect(() => {
    const wordArray = word?.lang2.split('');
    if (wordArray) {
      const arrayShuffle = shuffleCards(wordArray);
      setWordShuffle(arrayShuffle);
    }
  }, [word]);

  return (
    <div className="w-screen min-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full min-h-screen">
        <Link href="/games/puzzle" passHref>
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
          {wordShuffle.map((word) => (
            <div
              key={word}
              className="w-12 h-12 flex flex-col justify-center items-center text-xl bg-eng text-white m-2 rounded-sm">
              {word}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default PuzzlePlay;
