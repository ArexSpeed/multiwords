import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import Flag from 'components/Flag';
import { Swiper, SwiperSlide } from 'swiper/react';
import SchoolIcon from '@material-ui/icons/School';
import AddIcon from '@material-ui/icons/Add';
//import slice
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectCategoryId, selectWords } from 'redux/slices/mywordsSlice';
import { LearningLanguages, UserLanguage } from 'redux/slices/settingsSlice';
import { setCategoryId } from 'redux/slices/mywordsSlice';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Keyboard, Pagination, Navigation } from 'swiper/core';
import CategorySwitch from 'components/CategorySwitch';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

//Types
type Word = {
  eng: string;
  pol: string;
  ger: string;
  ned: string;
  spa: string;
  fra: string;
  ita: string;
};

type CheckAnswer = {
  check: boolean;
  correct: boolean | null;
};

interface IShowAnswer {
  wordId: number | null;
  word: string;
  eng: CheckAnswer;
  pol: CheckAnswer;
  ger: CheckAnswer;
  ned: CheckAnswer;
  spa: CheckAnswer;
  fra: CheckAnswer;
  ita: CheckAnswer;
}

const ShowPage = () => {
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector(selectCategoryId);
  const words = useAppSelector(selectWords);
  const userLanguage = useAppSelector(UserLanguage);
  const learnLanguages = useAppSelector(LearningLanguages);
  const keyMainLang = userLanguage.short as keyof Word;
  const [showAnswer, setShowAnswer] = useState<IShowAnswer[]>([]);
  useEffect(() => {
    words
      .filter((word) => word.categoryId === categoryId)
      .map((word) =>
        setShowAnswer((prev) => [
          ...prev,
          {
            wordId: Number(word.id),
            word: word.pol,
            eng: {
              check: false,
              correct: null
            },
            pol: {
              check: false,
              correct: null
            },
            ger: {
              check: false,
              correct: null
            },
            ned: {
              check: false,
              correct: null
            },
            spa: {
              check: false,
              correct: null
            },
            fra: {
              check: false,
              correct: null
            },
            ita: {
              check: false,
              correct: null
            }
          }
        ])
      );
  }, []);

  const handleDispatch = () => {
    dispatch(setCategoryId(categoryId));
  };

  const handleShowAnswer = (id: number, lang: string) => {
    const copyShowAnswer = [...showAnswer];
    switch (lang) {
      case 'eng':
        copyShowAnswer[id].eng.check = true;
        break;
      case 'pol':
        copyShowAnswer[id].pol.check = true;
        break;
      case 'ger':
        copyShowAnswer[id].ger.check = true;
        break;
      case 'ned':
        copyShowAnswer[id].ned.check = true;
        break;
      case 'spa':
        copyShowAnswer[id].spa.check = true;
        break;
      case 'fra':
        copyShowAnswer[id].fra.check = true;
        break;
      case 'ita':
        copyShowAnswer[id].ita.check = true;
        break;
      default:
        return;
    }
    setShowAnswer(copyShowAnswer);
  };

  const checkCorrectAnswer = (id: number, lang: string, correct: boolean) => {
    const copyShowAnswer = [...showAnswer];
    switch (lang) {
      case 'eng':
        copyShowAnswer[id].eng.correct = correct;
        break;
      case 'pol':
        copyShowAnswer[id].pol.correct = correct;
        break;
      case 'ger':
        copyShowAnswer[id].ger.correct = correct;
        break;
      case 'ned':
        copyShowAnswer[id].ned.correct = correct;
        break;
      case 'spa':
        copyShowAnswer[id].spa.correct = correct;
        break;
      case 'fra':
        copyShowAnswer[id].fra.correct = correct;
        break;
      case 'ita':
        copyShowAnswer[id].ita.correct = correct;
        break;
      default:
        return;
    }
    setShowAnswer(copyShowAnswer);
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row w-full p-3 justify-between items-center">
          <div>
            <CategorySwitch type="mywords" />
          </div>
        </section>
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24">
          <div className="flex flex-col w-full h-full justify-center items-center px-2 border-[1px] border-primary25 rounded-lg">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              keyboard={{
                enabled: true
              }}
              pagination={{
                type: 'fraction'
              }}
              navigation={true}
              className="w-full h-full">
              {words
                .filter((word) => word.categoryId === categoryId)
                .map((word, i) => (
                  <SwiperSlide key={word.id} className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag={userLanguage.short} />
                      <span className="text-lg">{word[keyMainLang]}</span>
                    </div>
                    {learnLanguages.eng && userLanguage.short !== 'eng' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="eng" />
                        {showAnswer[i]?.eng.check ? (
                          <>
                            <span className="text-lg">{word.eng}</span>
                            {showAnswer[i]?.eng.correct === null ? (
                              <>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-green-400"
                                  onClick={() => checkCorrectAnswer(i, 'eng', true)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-red-400"
                                  onClick={() => checkCorrectAnswer(i, 'eng', false)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : showAnswer[i]?.eng.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-[150px] h-[30px] bg-eng text-white rounded-full"
                            onClick={() => handleShowAnswer(i, 'eng')}>
                            Reveal
                          </button>
                        )}
                      </div>
                    )}
                    {learnLanguages.pol && userLanguage.short !== 'pol' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="pol" />
                        {showAnswer[i]?.pol.check ? (
                          <>
                            <span className="text-lg">{word.pol}</span>
                            {showAnswer[i]?.pol.correct === null ? (
                              <>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-green-400"
                                  onClick={() => checkCorrectAnswer(i, 'pol', true)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-red-400"
                                  onClick={() => checkCorrectAnswer(i, 'pol', false)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : showAnswer[i]?.pol.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-[150px] h-[30px] bg-pol text-white rounded-full"
                            onClick={() => handleShowAnswer(i, 'pol')}>
                            Pokaż
                          </button>
                        )}
                      </div>
                    )}
                    {learnLanguages.ger && userLanguage.short !== 'ger' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ger" />
                        {showAnswer[i]?.ger.check ? (
                          <>
                            <span className="text-lg">{word.ger}</span>
                            {showAnswer[i]?.ger.correct === null ? (
                              <>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-green-400"
                                  onClick={() => checkCorrectAnswer(i, 'ger', true)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-red-400"
                                  onClick={() => checkCorrectAnswer(i, 'ger', false)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : showAnswer[i]?.ger.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-[150px] h-[30px] bg-ger text-white rounded-full"
                            onClick={() => handleShowAnswer(i, 'ger')}>
                            Verraten
                          </button>
                        )}
                      </div>
                    )}
                    {learnLanguages.ned && userLanguage.short !== 'ned' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ned" />
                        {showAnswer[i]?.ned.check ? (
                          <>
                            <span className="text-lg">{word.ned}</span>
                            {showAnswer[i]?.ned.correct === null ? (
                              <>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-green-400"
                                  onClick={() => checkCorrectAnswer(i, 'ned', true)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-red-400"
                                  onClick={() => checkCorrectAnswer(i, 'ned', false)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : showAnswer[i]?.ned.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-[150px] h-[30px] bg-ned text-black rounded-full"
                            onClick={() => handleShowAnswer(i, 'ned')}>
                            Onthul
                          </button>
                        )}
                      </div>
                    )}
                    {learnLanguages.spa && userLanguage.short !== 'spa' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="spa" />
                        {showAnswer[i]?.spa.check ? (
                          <>
                            <span className="text-lg">{word.spa}</span>
                            {showAnswer[i]?.spa.correct === null ? (
                              <>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-green-400"
                                  onClick={() => checkCorrectAnswer(i, 'spa', true)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-red-400"
                                  onClick={() => checkCorrectAnswer(i, 'spa', false)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : showAnswer[i]?.spa.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-[150px] h-[30px] bg-spa text-black rounded-full"
                            onClick={() => handleShowAnswer(i, 'spa')}>
                            Revelar
                          </button>
                        )}
                      </div>
                    )}
                    {learnLanguages.fra && userLanguage.short !== 'fra' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="fra" />
                        {showAnswer[i]?.fra.check ? (
                          <>
                            <span className="text-lg">{word.fra}</span>
                            {showAnswer[i]?.fra.correct === null ? (
                              <>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-green-400"
                                  onClick={() => checkCorrectAnswer(i, 'fra', true)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-red-400"
                                  onClick={() => checkCorrectAnswer(i, 'fra', false)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : showAnswer[i]?.fra.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-[150px] h-[30px] bg-fra text-black rounded-full"
                            onClick={() => handleShowAnswer(i, 'fra')}>
                            Révéler
                          </button>
                        )}
                      </div>
                    )}
                    {learnLanguages.ita && userLanguage.short !== 'ita' && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ita" />
                        {showAnswer[i]?.ita.check ? (
                          <>
                            <span className="text-lg">{word.ita}</span>
                            {showAnswer[i]?.ita.correct === null ? (
                              <>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-green-400"
                                  onClick={() => checkCorrectAnswer(i, 'ita', true)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="mx-1 flex justify-center items-center text-lg text-red-400"
                                  onClick={() => checkCorrectAnswer(i, 'ita', false)}>
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : showAnswer[i]?.ita.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                          </>
                        ) : (
                          <button
                            className="w-[150px] h-[30px] bg-ita text-black rounded-full"
                            onClick={() => handleShowAnswer(i, 'ita')}>
                            Svelare
                          </button>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              <SwiperSlide className="flex flex-col justify-center items-center">
                <h3 className="text-lg">Your score:</h3>
                <div className="flex flex-col justify-center items-center">
                  {learnLanguages.eng && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="eng" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {learnLanguages.pol && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="pol" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {learnLanguages.ger && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="ger" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {learnLanguages.ned && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="ned" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {learnLanguages.spa && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="spa" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {learnLanguages.fra && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="fra" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {learnLanguages.ita && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="ita" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/mywords" passHref>
                    <button
                      className="p-2 bg-primaryLight rounded-full dark:bg-primaryDark"
                      onClick={handleDispatch}>
                      <SchoolIcon />
                    </button>
                  </Link>
                  <p>Back to mywords</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/mywords/addwords" passHref>
                    <button
                      className="p-2 bg-primaryLight rounded-full dark:bg-primaryDark"
                      onClick={handleDispatch}>
                      <AddIcon />
                    </button>
                  </Link>
                  <p>Add new words to category</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default ShowPage;
