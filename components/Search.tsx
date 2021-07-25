import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { toogleTheme, selectTheme } from 'redux/slices/settingsSlice';

const Search = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleToogle = () => {
    switch (theme) {
      case 'dark':
        dispatch(toogleTheme('light'));
        document.documentElement.classList.remove('dark');
        break;
      case 'light':
        dispatch(toogleTheme('dark'));
        document.documentElement.classList.add('dark');
        break;
      default:
        dispatch(toogleTheme('light'));
        document.documentElement.classList.remove('dark');
        break;
    }
  };

  return (
    <section className="m-3">
      <header className="flex flex-row w-full h-lg justify-between items-center">
        <div className="flex flex-row justify-start items-center w-3/4 h-full shadow-sm">
          <SearchIcon className="mx-2 text-secondary" />
          <input
            type="text"
            className="w-full bg-transparent text-gray-700 outline-none placeholder:text-primary"
            placeholder="Search a word"
          />
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-transparent border-none outline-none" onClick={handleToogle}>
            <InvertColorsIcon />
          </button>
        </div>
      </header>
    </section>
  );
};

export default Search;
