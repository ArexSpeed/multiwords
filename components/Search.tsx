import { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { toogleTheme, selectTheme } from 'redux/slices/settingsSlice';
import { words } from 'data';

//Types
type Word = {
  eng: string;
  pol: string;
  ger: string;
  ned: string;
  spa: string;
  fra: string;
  ita: string;
};

const Search = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');
  const [foundWords, setFoundWords] = useState<Word[]>([]);

  useEffect(() => {
    let tempWords: Array<Word> = [];
    if (searchValue.length > 2) {
      words
        .filter(
          (word) =>
            word.eng.toLowerCase().includes(searchValue.toLowerCase()) ||
            word.pol.toLowerCase().includes(searchValue.toLowerCase()) ||
            word.ger.toLowerCase().includes(searchValue.toLowerCase()) ||
            word.ned.toLowerCase().includes(searchValue.toLowerCase()) ||
            word.spa.toLowerCase().includes(searchValue.toLowerCase()) ||
            word.fra.toLowerCase().includes(searchValue.toLowerCase()) ||
            word.ita.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((item) =>
          tempWords.push({
            eng: item.eng,
            pol: item.pol,
            ger: item.ger,
            ned: item.ned,
            spa: item.spa,
            fra: item.fra,
            ita: item.ita
          })
        );
      setFoundWords(tempWords);
    } else {
      setFoundWords([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
            className="w-full bg-transparent text-gray-700 outline-none placeholder:text-primary dark:text-gray-300"
            placeholder="Search a word"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-transparent border-none outline-none" onClick={handleToogle}>
            <InvertColorsIcon />
          </button>
        </div>
      </header>
      {searchValue.length > 2 && (
        <div className="flex flex-col justify-start items-start w-full p-2 bg-secondaryLight rounded-sm overflow-scroll dark:bg-secondaryDark">
          <table>
            <thead>
              <tr className="text-[12px]">
                <td>ENG</td>
                <td>POL</td>
                <td>GER</td>
                <td>NED</td>
                <td>SPA</td>
                <td>FRA</td>
                <td>ITA</td>
              </tr>
            </thead>
            <tbody>
              {foundWords.length > 0 ? (
                foundWords.map((word, i) => (
                  <tr key={i}>
                    <td className="text-eng px-2">{word.eng}</td>
                    <td className="text-pol px-2">{word.pol}</td>
                    <td className="text-ger px-2">{word.ger}</td>
                    <td className="text-ned px-2">{word.ned}</td>
                    <td className="text-spa px-2">{word.spa}</td>
                    <td className="text-fra px-2">{word.fra}</td>
                    <td className="text-ita px-2">{word.ita}</td>
                  </tr>
                ))
              ) : (
                <tr>No results</tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Search;
