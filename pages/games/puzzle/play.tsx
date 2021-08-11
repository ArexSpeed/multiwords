import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import { useAppSelector } from 'redux/hooks';
import { selectPuzzleState } from 'redux/slices/gamesSlice';
import { UserLanguage } from 'redux/slices/settingsSlice';
import { words } from 'data';
import Flag from 'components/Flag';

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
  const [wordArray, setWordArray] = useState<string[]>([]);
  const [wordCorrect, setWordCorrect] = useState<string[]>([]);
  const [wordShuffle, setWordShuffle] = useState<string[]>([]);
  const [openHintWord, setOpenHintWord] = useState(false);
  const [openHintAnswer, setOpenHintAnswer] = useState(false);
  const [answer, setAnswer] = useState<string[]>([]);
  const [checkCorrect, setCheckCorrect] = useState(false);
  const [correct, setCorrect] = useState(false);

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

  //Step 3. Split word and shuffle letters (split 2 times cause if one the shuffleCards always change previous splitWord and correct doesn't work good)
  useEffect(() => {
    const splitWord = word?.lang2.split('');
    const splitWordCorrect = word?.lang2.split('');
    if (splitWord && splitWordCorrect) {
      setWordArray(splitWord);
      setWordCorrect(splitWordCorrect);
      const arrayShuffle = shuffleCards(splitWord);
      setWordShuffle(arrayShuffle);
    }
  }, [word]);

  const clearAnswer = () => {
    setAnswer([]);
    setCheckCorrect(false);
    setCorrect(false);
  };

  const checkAnswer = () => {
    setCheckCorrect(true);
    let correctlyArr = [];
    for (let i = 0; i < wordArray.length; i++) {
      correctlyArr.push(answer[i] === wordCorrect[i]);
    }
    const correctly = correctlyArr.every((val, i, arr) => val === arr[0]);
    setCorrect(correctly);
  };

  //Style of answer correct check
  const checkCorrectStyle =
    correct && checkCorrect
      ? 'bg-green-400'
      : !correct && checkCorrect
      ? 'bg-red-400'
      : 'bg-primaryLight dark:bg-primaryDark';

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
        <section className="flex flex-col justify-center items-center w-full min-h-screen">
          <h3>Find out the word from these letters</h3>
          <article className="flex flex-wrap justify-center items-center w-full p-2">
            <Flag flag={puzzleState.language} />
            {wordShuffle.map((letter, i) => (
              <button
                key={i}
                className="w-12 h-12 flex flex-col justify-center items-center text-xl bg-secondaryLight dark:bg-secondaryDark m-2 rounded-sm"
                onClick={() => setAnswer((prev) => [...prev, letter])}>
                {letter}
              </button>
            ))}
          </article>
          <article>
            {!openHintWord ? (
              <button
                className="bg-primaryLight dark:bg-primaryDark p-2 rounded-sm"
                onClick={() => setOpenHintWord(true)}>
                Hint word
              </button>
            ) : (
              <div className="flex flex-row justify-center items-center">
                <Flag flag={userLang.short} />
                <span className="text-lg">{word?.lang1}</span>
              </div>
            )}
          </article>
          <article className="flex flex-wrap justify-center items-center w-full p-2">
            <h3>Answer:</h3>
            {wordShuffle.map((word, i) => (
              <div
                key={i}
                className={`${checkCorrectStyle} w-12 h-12 flex flex-col justify-center items-center text-xl m-2 rounded-sm`}>
                {answer[i]}
              </div>
            ))}
          </article>
          <article className="flex flex-row justify-center items-center w-full">
            <button
              className="bg-primaryLight dark:bg-primaryDark p-2 m-2 rounded-sm"
              onClick={clearAnswer}>
              Clear answer
            </button>
            <button
              className="bg-secondaryLight dark:bg-secondaryDark p-2 m-2 rounded-sm"
              onClick={checkAnswer}>
              Check answer
            </button>
            <button
              className="bg-primaryLight dark:bg-primaryDark p-2 m-2 rounded-sm"
              onClick={() => {
                setOpenHintAnswer(!openHintAnswer);
                setAnswer(wordCorrect);
              }}>
              Show answer
            </button>
          </article>
        </section>
      </main>
    </div>
  );
};

export default PuzzlePlay;
