/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import Link from 'next/link';
import MobileNav from 'components/Nav/MobileNav';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import Flag from 'components/Flag';
import { levels, categories } from 'data';

const MemoPage = () => {
  const [firstLangBox, setFirstLangBox] = useState(false);
  const [secondLangBox, setSecondLangBox] = useState(false);
  const [firstLangGame, setFirstLangGame] = useState('eng');
  const [secondLangGame, setSecondLangGame] = useState('eng');
  const [level, setLevel] = useState('1');
  const [category, setCategory] = useState('');

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

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col justify-center items-center w-full p-3">
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-md">Game languages:</h4>
          </div>
          <article className="flex flex-row justify-between items-center">
            {/* First lang */}
            <div className="relative m-2">
              <button
                className="flex flex-row justify-center items-center"
                onClick={() => setFirstLangBox(!firstLangBox)}>
                1: <Flag flag="eng" />
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
                      onClick={() => setFirstLangGame(lang.short)}>
                      <Flag flag={lang.short} />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Second lang */}
            <div className="relative m-2">
              <button
                className="flex flex-row justify-center items-center"
                onClick={() => setSecondLangBox(!secondLangBox)}>
                2: <Flag flag="eng" />
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
              {secondLangBox && (
                <div className="absolute z-10 flex flex-col max-h-60 bg-secondaryLight rounded-sm p-2 overflow-y-auto dark:bg-secondary">
                  {langs.map((lang, i) => (
                    <button
                      key={i}
                      className="flex flex-row justify-start items-center rounded-sm hover:bg-secondary dark:hover:bg-secondaryDark"
                      onClick={() => setSecondLangGame(lang.short)}>
                      <Flag flag={lang.short} />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </article>
        </section>
        {/* Level/cat section */}
        <section className="flex flex-col justify-center items-center w-full p-3">
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-md">Select level and category for game</h4>
          </div>
          <article className="flex flex-row justify-between items-center m-2">
            <div className="flex flex-col mx-2">
              Level:
              <select
                className="text-md outline-none bg-secondaryLight rounded-sm px-2 dark:bg-secondaryDark"
                onChange={(e) => setLevel(e.target.value)}>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.title}
                  </option>
                ))}
                <option value="999">My Words</option>
              </select>
            </div>
            <div className="flex flex-col mx-2">
              Category:
              <select
                className="text-md outline-none bg-secondaryLight rounded-sm px-2 dark:bg-secondaryDark"
                onChange={(e) => setLevel(e.target.value)}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value="999">My Words</option>
              </select>
            </div>
          </article>
        </section>
        <section className="flex flex-row justify-center items-center w-full p-3">
          <span className="text-lg mx-2">Words:</span>
          <div className="text-lg mx-2">
            <button>-</button>
            <span>10</span>
            <button>+</button>
          </div>
        </section>
        <section className="flex flex-row justify-center items-center w-full p-3">
          <Link href="/games/memo/play" passHref>
            <button className="bg-secondary p-2 m-2 w-40 text-lg rounded-md">Play</button>
          </Link>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default MemoPage;
