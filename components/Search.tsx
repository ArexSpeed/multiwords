import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const Search = () => {
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
          <InvertColorsIcon />
        </div>
      </header>
    </section>
  );
};

export default Search;
