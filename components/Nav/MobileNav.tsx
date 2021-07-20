import React from 'react';
import Link from 'next/link';
import SchoolIcon from '@material-ui/icons/School';
import GamesIcon from '@material-ui/icons/Games';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SettingsIcon from '@material-ui/icons/Settings';

const MobileNav = () => {
  return (
    <section className="fixed bottom-0 inset-x-0 z-10 w-full h-20 px-4 mx-auto mb-2">
      <nav className="w-full h-20 bg-primary bg-opacity-25 backdrop-filter backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
        <ul className="flex flex-row justify-around items-center w-full h-full">
          <Link href="/">
            <li className="flex flex-col justify-center items-center h-full text-secondary cursor-pointer hover:text-gray-700">
              <SchoolIcon />
              <p className="font-semibold">Learn</p>
            </li>
          </Link>
          <Link href="/">
            <li className="flex flex-col justify-center items-center h-full text-secondary cursor-pointer hover:text-gray-700">
              <GamesIcon />
              <p className="font-semibold">Games</p>
            </li>
          </Link>
          <Link href="/">
            <li className="flex flex-col justify-center items-center h-full text-secondary cursor-pointer hover:text-gray-700">
              <BookmarksIcon />
              <p className="font-semibold">My Words</p>
            </li>
          </Link>
          <Link href="/">
            <li className="flex flex-col justify-center items-center h-full text-secondary cursor-pointer hover:text-gray-700">
              <ImportContactsIcon />
              <p className="font-semibold">Dico</p>
            </li>
          </Link>
          <Link href="/">
            <li className="flex flex-col justify-center items-center h-full text-secondary cursor-pointer hover:text-gray-700">
              <SettingsIcon />
              <p className="font-semibold">Settings</p>
            </li>
          </Link>
        </ul>
      </nav>
    </section>
  );
};

export default MobileNav;
