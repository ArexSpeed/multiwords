import React from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import Accordion from 'components/Accordion';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { levels, categories } from 'data';
//import slice
import { useAppDispatch } from 'redux/hooks';
import { setCategory, setLevel } from 'redux/slices/learnSlice';

const LearnPage = () => {
  const dispatch = useAppDispatch();

  const handleDispatch = (level: number, category: string) => {
    dispatch(setLevel(level));
    dispatch(setCategory(category));
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row w-full p-3 justify-between items-center">
          <h4 className="text-md">Categories:</h4>
          <div>
            <SettingsIcon />
          </div>
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
                          className="p-2 hover:bg-primary25 rounded-full"
                          onClick={() => handleDispatch(Number(item.lvl), item.name)}>
                          <ImportContactsIcon />
                        </button>
                      </Link>
                      <Link href="/learn/write" passHref>
                        <button
                          className="p-2 hover:bg-primary25 rounded-full"
                          onClick={() => handleDispatch(Number(item.lvl), item.name)}>
                          <EditIcon />
                        </button>
                      </Link>
                      <Link href="/learn/show" passHref>
                        <button
                          className="p-2 hover:bg-primary25 rounded-full"
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
