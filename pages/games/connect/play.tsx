import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import { useAppSelector } from 'redux/hooks';
import { selectConnectState, selectConnectLanguages } from 'redux/slices/gamesSlice';
import { words } from 'data';
import ConnectCard from 'components/ConnectCard';
import { shuffleCards } from 'utils';

type Word = {
  id: string;
  [key: string]: string;
};
type WordCards = {
  id: string;
  word: string;
  correct: boolean;
};

const ConnectPlay = () => {
  const connectLanguages = useAppSelector(selectConnectLanguages);
  const connectState = useAppSelector(selectConnectState);
  const [langQty, setLangQty] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [cardsInit, setCardsInit] = useState<Word[]>([]);
  const [cardsShuffle, setCardsShuffle] = useState<Word[]>([]);
  const [cardsShuffleEng, setCardsShuffleEng] = useState<WordCards[]>([]);
  const [cardsShufflePol, setCardsShufflePol] = useState<WordCards[]>([]);
  const [cardsShuffleGer, setCardsShuffleGer] = useState<WordCards[]>([]);
  const [cardsShuffleNed, setCardsShuffleNed] = useState<WordCards[]>([]);
  const [cardsShuffleSpa, setCardsShuffleSpa] = useState<WordCards[]>([]);
  const [cardsShuffleFra, setCardsShuffleFra] = useState<WordCards[]>([]);
  const [cardsShuffleIta, setCardsShuffleIta] = useState<WordCards[]>([]);
  const [cardsEng, setCardsEng] = useState<WordCards[]>([]);
  const [cardsPol, setCardsPol] = useState<WordCards[]>([]);
  const [cardsGer, setCardsGer] = useState<WordCards[]>([]);
  const [cardsNed, setCardsNed] = useState<WordCards[]>([]);
  const [cardsSpa, setCardsSpa] = useState<WordCards[]>([]);
  const [cardsFra, setCardsFra] = useState<WordCards[]>([]);
  const [cardsIta, setCardsIta] = useState<WordCards[]>([]);
  const [currentCheckEng, setCurrentCheckEng] = useState('');
  const [currentCheckPol, setCurrentCheckPol] = useState('');
  const [currentCheckGer, setCurrentCheckGer] = useState('');
  const [currentCheckNed, setCurrentCheckNed] = useState('');
  const [currentCheckSpa, setCurrentCheckSpa] = useState('');
  const [currentCheckFra, setCurrentCheckFra] = useState('');
  const [currentCheckIta, setCurrentCheckIta] = useState('');
  const [checkCorrect, setCheckCorrect] = useState('');
  const [openCards, setOpenCards] = useState<string[]>([]);
  const [clearedCards, setClearedCards] = useState<string[]>([]);
  useEffect(() => {
    Object.keys(connectLanguages).forEach((lang) => {
      if (connectLanguages[lang]) {
        setLangQty((prev) => prev + 1);
      }
    });
  }, [connectLanguages]);
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

  //Step 3. Slice shuffled words to quantity of selected by user and map to all language (first shuffle for all words)
  useEffect(() => {
    const cardsSlice = cardsShuffle.slice(0, connectState.wordsQty);
    cardsSlice.map((word) => {
      setCardsShuffleEng((prev) => [...prev, { id: word.id, word: word.eng, correct: false }]);
      setCardsShufflePol((prev) => [...prev, { id: word.id, word: word.pol, correct: false }]);
      setCardsShuffleGer((prev) => [...prev, { id: word.id, word: word.ger, correct: false }]);
      setCardsShuffleNed((prev) => [...prev, { id: word.id, word: word.ned, correct: false }]);
      setCardsShuffleSpa((prev) => [...prev, { id: word.id, word: word.spa, correct: false }]);
      setCardsShuffleFra((prev) => [...prev, { id: word.id, word: word.fra, correct: false }]);
      setCardsShuffleIta((prev) => [...prev, { id: word.id, word: word.ita, correct: false }]);
    });
  }, [cardsShuffle, connectState.wordsQty]);

  //Step 4. Second shuffle for all words in one column to every language have a diffrent shuffle and user see it on first look
  useEffect(() => {
    setCardsEng(shuffleCards(cardsShuffleEng));
    setCardsPol(shuffleCards(cardsShufflePol));
    setCardsGer(shuffleCards(cardsShuffleGer));
    setCardsNed(shuffleCards(cardsShuffleNed));
    setCardsSpa(shuffleCards(cardsShuffleSpa));
    setCardsFra(shuffleCards(cardsShuffleFra));
    setCardsIta(shuffleCards(cardsShuffleIta));
    // eslint-disable-next-line prettier/prettier
  }, [cardsShuffleEng, cardsShufflePol, cardsShuffleGer, cardsShuffleNed, cardsShuffleSpa, cardsShuffleFra, cardsShuffleIta]);

  const handleOpenCard = (index: string) => {
    if (openCards.length <= langQty - 1) {
      setOpenCards((prev) => [...prev, index]);
    }
  };

  //Step 5. Check correct in openCards
  useEffect(() => {
    if (openCards.length === langQty) {
      const checkOpenIds = openCards.every((val, i, arr) => val === arr[0]);
      if (checkOpenIds) {
        setCheckCorrect('correct');
        const Id = openCards[0];
        setClearedCards((prev) => [...prev, Id]);
        clearChecked();
      } else {
        setCheckCorrect('wrong');
        clearChecked();
      }
    }
  }, [openCards]);

  const clearChecked = () => {
    setOpenCards([]);
    setTimeout(() => {
      setCurrentCheckEng('');
      setCurrentCheckPol('');
      setCurrentCheckGer('');
      setCurrentCheckNed('');
      setCurrentCheckSpa('');
      setCurrentCheckFra('');
      setCurrentCheckIta('');
      setCheckCorrect('');
    }, 500);
  };

  const checkIsInactive = (id: string) => {
    const findCard = clearedCards.find((card) => card === id);
    if (findCard) {
      return true;
    } else {
      return false;
    }
  };

  //Step 6. finisg game when board is empty (cardsOne half of all cards on board == founded cards)
  useEffect(() => {
    if (clearedCards.length === connectState.wordsQty + 1) {
      setIsFinish(true);
    }
  }, [clearedCards, connectState.wordsQty]);

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
                  cardsEng.map((word) => (
                    <ConnectCard
                      key={word.id}
                      index={word.id}
                      word={word.word}
                      lang="eng"
                      color="white"
                      checkIndex={currentCheckEng}
                      setCheck={setCurrentCheckEng}
                      openCard={handleOpenCard}
                      checkCorrect={checkCorrect}
                      isInactive={checkIsInactive(word.id)}
                    />
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.pol &&
                  cardsPol.map((word) => (
                    <ConnectCard
                      key={word.id}
                      index={word.id}
                      word={word.word}
                      lang="pol"
                      color="white"
                      checkIndex={currentCheckPol}
                      setCheck={setCurrentCheckPol}
                      openCard={handleOpenCard}
                      checkCorrect={checkCorrect}
                      isInactive={checkIsInactive(word.id)}
                    />
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.ger &&
                  cardsGer.map((word) => (
                    <ConnectCard
                      key={word.id}
                      index={word.id}
                      word={word.word}
                      lang="ger"
                      color="white"
                      checkIndex={currentCheckGer}
                      setCheck={setCurrentCheckGer}
                      openCard={handleOpenCard}
                      checkCorrect={checkCorrect}
                      isInactive={checkIsInactive(word.id)}
                    />
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.ned &&
                  cardsNed.map((word) => (
                    <ConnectCard
                      key={word.id}
                      index={word.id}
                      word={word.word}
                      lang="ned"
                      color="white"
                      checkIndex={currentCheckNed}
                      setCheck={setCurrentCheckNed}
                      openCard={handleOpenCard}
                      checkCorrect={checkCorrect}
                      isInactive={checkIsInactive(word.id)}
                    />
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.spa &&
                  cardsSpa.map((word) => (
                    <ConnectCard
                      key={word.id}
                      index={word.id}
                      word={word.word}
                      lang="spa"
                      color="black"
                      checkIndex={currentCheckSpa}
                      setCheck={setCurrentCheckSpa}
                      openCard={handleOpenCard}
                      checkCorrect={checkCorrect}
                      isInactive={checkIsInactive(word.id)}
                    />
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.fra &&
                  cardsFra.map((word) => (
                    <ConnectCard
                      key={word.id}
                      index={word.id}
                      word={word.word}
                      lang="fra"
                      color="black"
                      checkIndex={currentCheckFra}
                      setCheck={setCurrentCheckFra}
                      openCard={handleOpenCard}
                      checkCorrect={checkCorrect}
                      isInactive={checkIsInactive(word.id)}
                    />
                  ))}
              </div>
              <div className="flex flex-col justify-center items-center">
                {connectLanguages.ita &&
                  cardsIta.map((word) => (
                    <ConnectCard
                      key={word.id}
                      index={word.id}
                      word={word.word}
                      lang="ita"
                      color="black"
                      checkIndex={currentCheckIta}
                      setCheck={setCurrentCheckIta}
                      openCard={handleOpenCard}
                      checkCorrect={checkCorrect}
                      isInactive={checkIsInactive(word.id)}
                    />
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
