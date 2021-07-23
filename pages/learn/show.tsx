import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import { categories, words } from 'data';
import Flag from 'components/Flag';
import { Swiper, SwiperSlide } from 'swiper/react';
import SchoolIcon from '@material-ui/icons/School';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Keyboard, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

//Types
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
  const [showAnswer, setShowAnswer] = useState<IShowAnswer[]>([]);
  useEffect(() => {
    words
      .filter((word) => word.cat === category)
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

  //change to toolkit
  const level = '1';
  const category = 'Calendar';
  const userMainLang = 'fra';
  const userLangs = {
    eng: true,
    pol: false,
    ger: true,
    ned: false,
    spa: true,
    fra: false,
    ita: true
  };
  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row w-full p-3 justify-between items-center">
          <div>
            <select className="text-md outline-none bg-secondary25 rounded-sm px-2">
              {categories
                .filter((category) => category.lvl === level)
                .map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
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
              className="w-full h-full"
              onSlideChange={() => console.log(showAnswer)}>
              {words
                .filter((word) => word.cat === category)
                .map((word, i) => (
                  <SwiperSlide key={word.id} className="flex flex-col justify-center items-center">
                    {userMainLang && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag={userMainLang} />
                        <span className="text-lg">{word[userMainLang]}</span>
                      </div>
                    )}
                    {userLangs.eng && (
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
                            className="w-[150px] h-[30px] bg-blue-900 rounded-full"
                            onClick={() => handleShowAnswer(i, 'eng')}>
                            Show
                          </button>
                        )}
                      </div>
                    )}
                    {userLangs.pol && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="pol" /> <span className="text-lg">{word.pol}</span>
                      </div>
                    )}
                    {userLangs.ger && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ger" /> <span className="text-lg">{word.ger}</span>
                      </div>
                    )}
                    {userLangs.ned && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ned" /> <span className="text-lg">{word.ned}</span>
                      </div>
                    )}
                    {userLangs.spa && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="spa" /> <span className="text-lg">{word.spa}</span>
                      </div>
                    )}
                    {userLangs.fra && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="fra" /> <span className="text-lg">{word.fra}</span>
                      </div>
                    )}
                    {userLangs.ita && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ita" /> <span className="text-lg">{word.ita}</span>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default ShowPage;
