/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import Link from 'next/link';
import MobileNav from 'components/Nav/MobileNav';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import Flag from 'components/Flag';
import { levels, categories } from 'data';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectCategories } from 'redux/slices/mywordsSlice';
import {
  setConnectState,
  setConnectLanguages,
  selectConnectLanguages
} from 'redux/slices/gamesSlice';

const ConnectPage = () => {
  const connectLanguagues = useAppSelector(selectConnectLanguages);
  const [wordsQty, setWordsQty] = useState(10);
  const [level, setLevel] = useState('1');
  const [categoryGame, setCategoryGame] = useState('Numbers');
  const mwCategories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const handlePlay = () => {
    const connectSettings = {
      level,
      category: categoryGame,
      wordsQty
    };
    dispatch(setConnectState(connectSettings));
  };

  const checkLanguage = (lang: string) => {
    dispatch(setConnectLanguages(lang));
  };

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
          <div className="flex flex-row justify-start items-center overflow-x-auto">
            {langs.map((lang, i) => (
              <label key={i} className="flex flex-col justify-center items-center cursor-pointer">
                <Flag flag={lang.short} />
                <input
                  type="checkbox"
                  defaultChecked={connectLanguagues[lang.short]}
                  onChange={() => checkLanguage(lang.short)}
                />
              </label>
            ))}
          </div>
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
              {level !== '999' ? (
                <select
                  className="text-md outline-none bg-secondaryLight rounded-sm px-2 dark:bg-secondaryDark"
                  onChange={(e) => setCategoryGame(e.target.value)}>
                  {categories
                    .filter((category) => category.lvl === level)
                    .map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
              ) : (
                <select
                  className="text-md outline-none bg-secondaryLight rounded-sm px-2 dark:bg-secondaryDark"
                  onChange={(e) => setCategoryGame(e.target.value)}>
                  {mwCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </article>
        </section>
        <section className="flex flex-row justify-center items-center w-full p-3">
          <span className="text-lg mx-2">Words:</span>
          <div className="flex flex-row justify-center items-center text-lg mx-2">
            <button
              className="w-6 h-6 p-2 mx-2 flex justify-center items-center bg-primaryLight rounded-full dark:bg-primaryDark"
              disabled={wordsQty <= 2}
              onClick={() => setWordsQty(wordsQty - 2)}>
              -
            </button>
            <span className="text-[30px]">{wordsQty}</span>
            <button
              className="w-6 h-6 p-2 mx-2 flex justify-center items-center bg-secondaryLight rounded-full dark:bg-secondaryDark"
              disabled={wordsQty >= 20}
              onClick={() => setWordsQty(wordsQty + 2)}>
              +
            </button>
          </div>
        </section>
        <section className="flex flex-row justify-center items-center w-full p-3">
          <Link href="/games/connect/play" passHref>
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

export default ConnectPage;
