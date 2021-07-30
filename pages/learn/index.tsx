import { useState } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import Accordion from 'components/Accordion';
import Flag from 'components/Flag';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { levels, categories } from 'data';
//import slice
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setCategory, setLevel } from 'redux/slices/learnSlice';
import { LearningLanguages, changeLearningLanguages } from 'redux/slices/settingsSlice';

const LearnPage = () => {
  const dispatch = useAppDispatch();
  const learnLanguages = useAppSelector(LearningLanguages);
  const [settingBox, setSettingBox] = useState(false);

  const handleDispatch = (level: number, category: string) => {
    dispatch(setLevel(level));
    dispatch(setCategory(category));
  };

  const langs = ['eng', 'pol', 'ger', 'ned', 'spa', 'fra', 'ita'];
  const checkLearningLanguage = (lang: string) => {
    dispatch(changeLearningLanguages(lang));
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col w-full p-3">
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-md">Categories:</h4>
            <button className="outline-none" onClick={() => setSettingBox(!settingBox)}>
              <SettingsIcon style={{ fontSize: '20px' }} />
            </button>
          </div>
          {settingBox && (
            <div className="flex flex-col justify-start items-center w-full h-auto p-2 bg-secondaryLight rounded-sm dark:bg-secondaryDark">
              <div className="flex flex-row">
                <h4>Show languages:</h4>
              </div>
              <div className="flex flex-row justify-start items-center overflow-x-auto">
                {langs.map((lang, i) => (
                  <label
                    key={i}
                    className="flex flex-col justify-center items-center cursor-pointer">
                    <Flag flag={lang} />
                    <input
                      type="checkbox"
                      defaultChecked={learnLanguages[lang]}
                      onChange={() => checkLearningLanguage(lang)}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>
        <section className="flex flex-col w-full p-3 justify-between items-center pb-24 dark:bg-gray-700">
          {levels.map((level) => (
            <Accordion title={level.title} key={level.id}>
              {categories
                .filter((category) => category.lvl === level.id)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between items-center p-2 border-b-2 border-secondary border-opacity-20">
                    <p className="text-lg">{item.name}</p>
                    <div className="flex flex-row justify-around items-center">
                      <Link href="/learn/words" passHref>
                        <button
                          className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
                          onClick={() => handleDispatch(Number(item.lvl), item.name)}>
                          <ImportContactsIcon />
                        </button>
                      </Link>
                      <Link href="/learn/write" passHref>
                        <button
                          className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
                          onClick={() => handleDispatch(Number(item.lvl), item.name)}>
                          <EditIcon />
                        </button>
                      </Link>
                      <Link href="/learn/show" passHref>
                        <button
                          className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
                          onClick={() => handleDispatch(Number(item.lvl), item.name)}>
                          <VisibilityOffIcon />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </Accordion>
          ))}
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default LearnPage;
