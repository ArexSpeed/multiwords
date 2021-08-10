import React, { useState } from 'react';
import Link from 'next/link';
import MobileNav from 'components/Nav/MobileNav';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import Flag from 'components/Flag';
import { useAppDispatch } from 'redux/hooks';
import { setPuzzleState } from 'redux/slices/gamesSlice';

const PuzzlePage = () => {
  const [firstLangBox, setFirstLangBox] = useState(false);
  const [firstLangGame, setFirstLangGame] = useState('eng');
  const [lettersQty, setLettersQty] = useState(4);
  const dispatch = useAppDispatch();

  const langs = [
    {
      short: 'eng',
      name: 'English'
    },
    {
      short: 'pol',
      name: 'Polski'
    },
    {
      short: 'ger',
      name: 'Deutsch'
    },
    {
      short: 'ned',
      name: 'Nederlande'
    },
    {
      short: 'spa',
      name: 'Español'
    },
    {
      short: 'fra',
      name: 'Français'
    },
    {
      short: 'ita',
      name: 'Italiano'
    }
  ];

  const handlePlay = () => {
    const puzzleSettings = {
      language: firstLangGame,
      lettersQty
    };
    dispatch(setPuzzleState(puzzleSettings));
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col justify-center items-center w-full p-3">
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-md">Word language:</h4>
          </div>
          <article className="flex flex-row justify-between items-center">
            {/* First lang */}
            <div className="relative m-2">
              <button
                className="flex flex-row justify-center items-center"
                onClick={() => setFirstLangBox(!firstLangBox)}>
                1: <Flag flag={firstLangGame} />
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {firstLangBox && (
                <div className="absolute z-10 flex flex-col max-h-60 bg-secondaryLight rounded-sm p-2 overflow-y-auto dark:bg-secondary">
                  {langs.map((lang, i) => (
                    <button
                      key={i}
                      className="flex flex-row justify-start items-center rounded-sm hover:bg-secondary dark:hover:bg-secondaryDark"
                      onClick={() => {
                        setFirstLangGame(lang.short);
                        setFirstLangBox(false);
                      }}>
                      <Flag flag={lang.short} />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </article>
        </section>
        {/* Letters section */}
        <section className="flex flex-row justify-center items-center w-full p-3">
          <span className="text-lg mx-2">Letters quantity:</span>
          <div className="flex flex-row justify-center items-center text-lg mx-2">
            <button
              className="w-6 h-6 p-2 mx-2 flex justify-center items-center bg-primaryLight rounded-full dark:bg-primaryDark"
              disabled={lettersQty <= 3}
              onClick={() => setLettersQty(lettersQty - 1)}>
              -
            </button>
            <span className="text-[30px]">{lettersQty}</span>
            <button
              className="w-6 h-6 p-2 mx-2 flex justify-center items-center bg-secondaryLight rounded-full dark:bg-secondaryDark"
              disabled={lettersQty >= 14}
              onClick={() => setLettersQty(lettersQty + 1)}>
              +
            </button>
          </div>
        </section>
        <section className="flex flex-row justify-center items-center w-full p-3">
          <Link href="/games/puzzle/play" passHref>
            <button className="bg-secondary p-2 m-2 w-40 text-lg rounded-md" onClick={handlePlay}>
              Play
            </button>
          </Link>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default PuzzlePage;
