import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const Search = () => {
  return (
    <header className="flex flex-row w-full m-4 h-lg items-center">
      <div className="flex flex-row justify-start items-center w-3/4 h-full shadow-sm">
        <SearchIcon className="mx-2 text-secondary" />
        <input
          type="text"
          className="w-full text-gray-700 outline-none placeholder:text-primary"
          placeholder="Search a word"
        />
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <InvertColorsIcon />
      </div>
    </header>
  );
};

export default Search;
