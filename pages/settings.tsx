/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import MobileNav from 'components/Nav/MobileNav';
import Flag from 'components/Flag';
//slice
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  UserLanguage,
  LearningLanguages,
  DicoLanguages,
  changeUserLanguage,
  changeLearningLanguages,
  changeDicoLanguages
} from 'redux/slices/settingsSlice';
//icon
import SchoolIcon from '@material-ui/icons/School';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const SettingsPage = () => {
  const userLanguage = useAppSelector(UserLanguage);
  const learnLanguages = useAppSelector(LearningLanguages);
  const dicoLanguages = useAppSelector(DicoLanguages);

  const [openBox, setOpenBox] = useState(false);
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

  const changeMainLang = (short: string, name: string) => {
    dispatch(
      changeUserLanguage({
        short,
        name
      })
    );
    setOpenBox(false);
  };

  const checkLanguage = (lang: string) => {
    dispatch(changeLearningLanguages(lang));
  };

  const checkDicoLanguage = (lang: string) => {
    dispatch(changeDicoLanguages(lang));
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24 overflow-hidden">
          <div className="flex flex-col w-full h-full justify-start items-center px-2 border-[1px] border-primary25 rounded-lg overflow-y-auto">
            <article className="flex flex-row justify-center items-center">
              <h2>Your main language: </h2>
              <div className="relative">
                <button
                  className="flex flex-row justify-center items-center"
                  onClick={() => setOpenBox(!openBox)}>
                  <Flag flag={userLanguage.short} />
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
                {openBox && (
                  <div className="absolute z-10 flex flex-col max-h-60 bg-secondaryLight rounded-sm p-2 overflow-y-auto dark:bg-secondary">
                    {langs.map((lang, i) => (
                      <button
                        key={i}
                        className="flex flex-row justify-start items-center rounded-sm hover:bg-secondary dark:hover:bg-secondaryDark"
                        onClick={() => changeMainLang(lang.short, lang.name)}>
                        <Flag flag={lang.short} />
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
            <article className="my-4">
              <div className="flex flex-col justify-center items-center overflow-hidden">
                <div className="flex flex-row">
                  <SchoolIcon />
                  <h2 className="ml-2">Language to learn</h2>
                </div>
                <div className="flex flex-row justify-start items-center overflow-x-auto">
                  {langs.map((lang, i) => (
                    <label
                      key={i}
                      className="flex flex-col justify-center items-center cursor-pointer">
                      <Flag flag={lang.short} />
                      <input
                        type="checkbox"
                        defaultChecked={learnLanguages[lang.short]}
                        onChange={() => checkLanguage(lang.short)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </article>
            <article className="my-4">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                  <ImportContactsIcon />
                  <h2 className="ml-2">Language in Search/Dico</h2>
                </div>
                <div className="flex flex-row justify-start items-center overflow-x-auto">
                  {langs.map((lang, i) => (
                    <label
                      key={i}
                      className="flex flex-col justify-center items-center cursor-pointer">
                      <Flag flag={lang.short} />
                      <input
                        type="checkbox"
                        defaultChecked={dicoLanguages[lang.short]}
                        onChange={() => checkDicoLanguage(lang.short)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default SettingsPage;
