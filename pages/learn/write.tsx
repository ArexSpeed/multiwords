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
  correct: boolean;
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

const WritePage = () => {
  const [showAnswer, setShowAnswer] = useState<IShowAnswer[]>([]);
  const [answerValues, setAnswerValues] = useState({
    eng: '',
    pol: '',
    ger: '',
    ned: '',
    spa: '',
    fra: '',
    ita: ''
  });

  const resetAnswerValues = {
    eng: '',
    pol: '',
    ger: '',
    ned: '',
    spa: '',
    fra: '',
    ita: ''
  };

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
              correct: false
            },
            pol: {
              check: false,
              correct: false
            },
            ger: {
              check: false,
              correct: false
            },
            ned: {
              check: false,
              correct: false
            },
            spa: {
              check: false,
              correct: false
            },
            fra: {
              check: false,
              correct: false
            },
            ita: {
              check: false,
              correct: false
            }
          }
        ])
      );
  }, []);

  const handleAnswer = (e: React.FormEvent, id: number, word: string, lang: string) => {
    e.preventDefault();
    const copyShowAnswer = [...showAnswer];
    switch (lang) {
      case 'eng':
        copyShowAnswer[id].eng.check = true;
        copyShowAnswer[id].eng.correct = answerValues.eng === word;
        break;
      case 'pol':
        copyShowAnswer[id].pol.check = true;
        copyShowAnswer[id].pol.correct = answerValues.pol === word;
        break;
      case 'ger':
        copyShowAnswer[id].ger.check = true;
        copyShowAnswer[id].ger.correct = answerValues.ger === word;
        break;
      case 'ned':
        copyShowAnswer[id].ned.check = true;
        copyShowAnswer[id].ned.correct = answerValues.ned === word;
        break;
      case 'spa':
        copyShowAnswer[id].spa.check = true;
        copyShowAnswer[id].spa.correct = answerValues.spa === word;
        break;
      case 'fra':
        copyShowAnswer[id].fra.check = true;
        copyShowAnswer[id].fra.correct = answerValues.fra === word;
        break;
      case 'ita':
        copyShowAnswer[id].ita.check = true;
        copyShowAnswer[id].ita.correct = answerValues.ita === word;
        break;
      default:
        return;
    }
    setShowAnswer(copyShowAnswer);
    setAnswerValues(resetAnswerValues);
  };

  const repeatAnswer = (id: number, lang: string) => {
    const copyShowAnswer = [...showAnswer];
    switch (lang) {
      case 'eng':
        copyShowAnswer[id].eng.check = false;
        copyShowAnswer[id].eng.correct = false;
        break;
      case 'pol':
        copyShowAnswer[id].pol.check = false;
        copyShowAnswer[id].pol.correct = false;
        break;
      case 'ger':
        copyShowAnswer[id].ger.check = false;
        copyShowAnswer[id].ger.correct = false;
        break;
      case 'ned':
        copyShowAnswer[id].ned.check = false;
        copyShowAnswer[id].ned.correct = false;
        break;
      case 'spa':
        copyShowAnswer[id].spa.check = false;
        copyShowAnswer[id].spa.correct = false;
        break;
      case 'fra':
        copyShowAnswer[id].fra.check = false;
        copyShowAnswer[id].fra.correct = false;
        break;
      case 'ita':
        copyShowAnswer[id].ita.check = false;
        copyShowAnswer[id].ita.correct = false;
        break;
      default:
        return;
    }
    setShowAnswer(copyShowAnswer);
    setAnswerValues(resetAnswerValues);
  };

  const level = '1';
  const category = 'Calendar';
  const userMainLang = 'fra';
  const userLangs = {
    eng: false,
    pol: true,
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
              onSlideChange={() => setAnswerValues(resetAnswerValues)}>
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
                            {showAnswer[i]?.eng.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                            <button
                              className="w-6 h-6 flex justify-center items-center bg-yellow-400 rounded-full"
                              onClick={() => repeatAnswer(i, 'eng')}>
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              handleAnswer(e, i, word.eng, 'eng');
                            }}>
                            <input
                              type="text"
                              placeholder="Napisz słowo"
                              value={answerValues.eng}
                              onChange={(e) =>
                                setAnswerValues({ ...answerValues, eng: e.target.value })
                              }
                            />
                            <button type="submit" className="w-6 h-6 bg-green-400 rounded-full">
                              OK
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                    {userLangs.pol && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="pol" />
                        {showAnswer[i]?.pol.check ? (
                          <>
                            <span className="text-lg">{word.pol}</span>
                            {showAnswer[i]?.pol.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                            <button
                              className="w-6 h-6 flex justify-center items-center bg-yellow-400 rounded-full"
                              onClick={() => repeatAnswer(i, 'pol')}>
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              handleAnswer(e, i, word.pol, 'pol');
                            }}>
                            <input
                              type="text"
                              placeholder="Napisz słowo"
                              value={answerValues.pol}
                              onChange={(e) =>
                                setAnswerValues({ ...answerValues, pol: e.target.value })
                              }
                            />
                            <button type="submit" className="w-6 h-6 bg-green-400 rounded-full">
                              OK
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                    {userLangs.ger && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ger" />
                        {showAnswer[i]?.ger.check ? (
                          <>
                            <span className="text-lg">{word.ger}</span>
                            {showAnswer[i]?.ger.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                            <button
                              className="w-6 h-6 flex justify-center items-center bg-yellow-400 rounded-full"
                              onClick={() => repeatAnswer(i, 'ger')}>
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              handleAnswer(e, i, word.ger, 'ger');
                            }}>
                            <input
                              type="text"
                              placeholder="Napisz słowo"
                              value={answerValues.ger}
                              onChange={(e) =>
                                setAnswerValues({ ...answerValues, ger: e.target.value })
                              }
                            />
                            <button type="submit" className="w-6 h-6 bg-green-400 rounded-full">
                              OK
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                    {userLangs.ned && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ned" />
                        {showAnswer[i]?.ned.check ? (
                          <>
                            <span className="text-lg">{word.ned}</span>
                            {showAnswer[i]?.ned.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                            <button
                              className="w-6 h-6 flex justify-center items-center bg-yellow-400 rounded-full"
                              onClick={() => repeatAnswer(i, 'ned')}>
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              handleAnswer(e, i, word.ned, 'ned');
                            }}>
                            <input
                              type="text"
                              placeholder="Napisz słowo"
                              value={answerValues.ned}
                              onChange={(e) =>
                                setAnswerValues({ ...answerValues, ned: e.target.value })
                              }
                            />
                            <button type="submit" className="w-6 h-6 bg-green-400 rounded-full">
                              OK
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                    {userLangs.spa && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="spa" />
                        {showAnswer[i]?.spa.check ? (
                          <>
                            <span className="text-lg">{word.spa}</span>
                            {showAnswer[i]?.spa.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                            <button
                              className="w-6 h-6 flex justify-center items-center bg-yellow-400 rounded-full"
                              onClick={() => repeatAnswer(i, 'spa')}>
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              handleAnswer(e, i, word.spa, 'spa');
                            }}>
                            <input
                              type="text"
                              placeholder="Napisz słowo"
                              value={answerValues.spa}
                              onChange={(e) =>
                                setAnswerValues({ ...answerValues, spa: e.target.value })
                              }
                            />
                            <button type="submit" className="w-6 h-6 bg-green-400 rounded-full">
                              OK
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                    {userLangs.fra && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="fra" />
                        {showAnswer[i]?.fra.check ? (
                          <>
                            <span className="text-lg">{word.fra}</span>
                            {showAnswer[i]?.fra.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                            <button
                              className="w-6 h-6 flex justify-center items-center bg-yellow-400 rounded-full"
                              onClick={() => repeatAnswer(i, 'fra')}>
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              handleAnswer(e, i, word.fra, 'fra');
                            }}>
                            <input
                              type="text"
                              placeholder="Napisz słowo"
                              value={answerValues.fra}
                              onChange={(e) =>
                                setAnswerValues({ ...answerValues, fra: e.target.value })
                              }
                            />
                            <button type="submit" className="w-6 h-6 bg-green-400 rounded-full">
                              OK
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                    {userLangs.ita && (
                      <div className="flex flex-row justify-center items-center">
                        <Flag flag="ita" />
                        {showAnswer[i]?.ita.check ? (
                          <>
                            <span className="text-lg">{word.ita}</span>
                            {showAnswer[i]?.ita.correct ? (
                              <span className="mx-1 text-lg text-green-400">+</span>
                            ) : (
                              <span className="mx-1 text-lg text-red-400">-</span>
                            )}
                            <button
                              className="w-6 h-6 flex justify-center items-center bg-yellow-400 rounded-full"
                              onClick={() => repeatAnswer(i, 'ita')}>
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <form
                            onSubmit={(e) => {
                              handleAnswer(e, i, word.ita, 'ita');
                            }}>
                            <input
                              type="text"
                              placeholder="Napisz słowo"
                              value={answerValues.ita}
                              onChange={(e) =>
                                setAnswerValues({ ...answerValues, ita: e.target.value })
                              }
                            />
                            <button type="submit" className="w-6 h-6 bg-green-400 rounded-full">
                              OK
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              <SwiperSlide className="flex flex-col justify-center items-center">
                <h3 className="text-lg">Your score:</h3>
                <div className="flex flex-col justify-center items-center">
                  {userLangs.eng && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="eng" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {userLangs.pol && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="pol" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {userLangs.ger && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="ger" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {userLangs.ned && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="ned" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {userLangs.spa && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="spa" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {userLangs.fra && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="fra" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                  {userLangs.ita && (
                    <div className="flex flex-row justify-center items-center">
                      <Flag flag="ita" /> <span className="text-lg">10/20</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Link href="/learn" passHref>
                    <button
                      className="p-2 bg-primary25 rounded-full hover:bg-primary50"
                      onClick={() => console.log('')}>
                      <SchoolIcon />
                    </button>
                  </Link>
                  <p>Back to category</p>
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

export default WritePage;
