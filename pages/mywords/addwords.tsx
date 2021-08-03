import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import Flag from 'components/Flag';
import MobileNav from 'components/Nav/MobileNav';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectCategoryId, selectCategories, addWords } from 'redux/slices/mywordsSlice';
import { v4 as uuidv4 } from 'uuid';

const AddWordsPage = () => {
  const categoryId = useAppSelector(selectCategoryId);
  const categories = useAppSelector(selectCategories);
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useAppDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [newWord, setNewWord] = useState({
    eng: '',
    pol: '',
    ger: '',
    ned: '',
    spa: '',
    fra: '',
    ita: ''
  });

  useEffect(() => {
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      setCategoryName(category.name);
    }
  }, [categoryId]);

  const addNewWords = () => {
    dispatch(
      addWords({
        categoryId: categoryId,
        id: uuidv4(),
        eng: newWord.eng,
        pol: newWord.pol,
        ger: newWord.ger,
        ned: newWord.ned,
        spa: newWord.spa,
        fra: newWord.fra,
        ita: newWord.ita
      })
    );
    setIsAdd(true);
  };

  const addNextWords = () => {
    setIsAdd(false);
    setNewWord({
      eng: '',
      pol: '',
      ger: '',
      ned: '',
      spa: '',
      fra: '',
      ita: ''
    });
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col w-full p-3">
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-md">Add new words to {categoryName}</h4>
          </div>
        </section>
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24">
          <div className="flex flex-col w-full h-full justify-center items-center px-2 border-[1px] border-primary25 rounded-lg">
            <article className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center">
                <Flag flag="eng" />
                <input
                  type="text"
                  placeholder="New word"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={newWord.eng}
                  onChange={(e) => setNewWord({ ...newWord, eng: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="pol" />

                <input
                  type="text"
                  placeholder="Nowe słowo"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={newWord.pol}
                  onChange={(e) => setNewWord({ ...newWord, pol: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="ger" />
                <input
                  type="text"
                  placeholder="neues Wort"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={newWord.ger}
                  onChange={(e) => setNewWord({ ...newWord, ger: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="ned" />
                <input
                  type="text"
                  placeholder="nieuw woord"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={newWord.ned}
                  onChange={(e) => setNewWord({ ...newWord, ned: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="spa" />
                <input
                  type="text"
                  placeholder="palabra nueva"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={newWord.spa}
                  onChange={(e) => setNewWord({ ...newWord, spa: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="fra" />
                <input
                  type="text"
                  placeholder="nouveau mot"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={newWord.fra}
                  onChange={(e) => setNewWord({ ...newWord, fra: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="ita" />
                <input
                  type="text"
                  placeholder="nuova parola"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={newWord.ita}
                  onChange={(e) => setNewWord({ ...newWord, ita: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                {!isAdd ? (
                  <button
                    className="bg-secondary p-2 m-3 rounded-sm outline-none"
                    onClick={addNewWords}>
                    Add
                  </button>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <div className="bg-green-400 p-2 m-3 rounded-sm">You added new words!</div>
                    <div className="flex flex-row">
                      <button
                        className="bg-secondary p-2 m-3 rounded-sm outline-none"
                        onClick={addNextWords}>
                        Next
                      </button>
                      <Link href="/mywords" passHref>
                        <button className="bg-primary p-2 m-3 rounded-sm outline-none">Back</button>
                      </Link>
                      <Link href="/mywords/check" passHref>
                        <button className="bg-secondary p-2 m-3 rounded-sm outline-none">
                          Check
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default AddWordsPage;
