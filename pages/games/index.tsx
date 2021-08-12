import React from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const GamesPage = () => {
  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col justify-center items-center">
          <h3 className="text-gray-600 dark:text-gray-300">Select your game to learn</h3>
          <article className="flex flex-row justify-around items-center">
            <Link href="/games/memo" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <ViewAgendaIcon style={{ fontSize: '60px' }} />
                <h5>Memo</h5>
              </div>
            </Link>
            <Link href="/games/puzzle" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <BorderAllIcon style={{ fontSize: '60px' }} />
                <h5>Word Puzzle</h5>
              </div>
            </Link>
          </article>
          <article className="flex flex-row justify-around items-center">
            <Link href="/games/connect" passHref>
              <div className="w-[100px] h-[100px] m-4 bg-gray-100 dark:bg-gray-800 flex flex-col justify-between items-center rounded-sm shadow-sm">
                <SubdirectoryArrowRightIcon style={{ fontSize: '60px' }} />
                <h5>Connect</h5>
              </div>
            </Link>
          </article>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default GamesPage;
