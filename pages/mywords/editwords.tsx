import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import Flag from 'components/Flag';
import MobileNav from 'components/Nav/MobileNav';
import { selectWordId, selectWords, editWordControl } from 'redux/slices/mywordsSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

type Words = {
  id: string;
  categoryId: string;
  [key: string]: string;
};

const EditWordsPage = () => {
  const dispatch = useAppDispatch();
  const wordId = useAppSelector(selectWordId);
  const words = useAppSelector(selectWords);
  const [editWord, setEditWord] = useState<Words>({
    categoryId: '',
    id: '',
    eng: '',
    pol: '',
    ger: '',
    ned: '',
    spa: '',
    fra: '',
    ita: ''
  });
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    const word = words.find((word) => word.id === wordId);
    if (word) {
      setEditWord(word);
    }
  }, [wordId]);

  const confirmEdit = () => {
    dispatch(editWordControl(editWord));
    setIsConfirm(true);
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col w-full p-3">
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-md">Edit words</h4>
          </div>
        </section>
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24">
          <div className="flex flex-col w-full h-full justify-center items-center px-2 border-[1px] border-primary25 rounded-lg">
            <article className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center">
                <Flag flag="eng" />
                <input
                  type="text"
                  placeholder="Edit word"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={editWord.eng}
                  onChange={(e) => setEditWord({ ...editWord, eng: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="pol" />

                <input
                  type="text"
                  placeholder="Nowe słowo"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={editWord.pol}
                  onChange={(e) => setEditWord({ ...editWord, pol: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="ger" />
                <input
                  type="text"
                  placeholder="neues Wort"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={editWord.ger}
                  onChange={(e) => setEditWord({ ...editWord, ger: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="ned" />
                <input
                  type="text"
                  placeholder="nieuw woord"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={editWord.ned}
                  onChange={(e) => setEditWord({ ...editWord, ned: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="spa" />
                <input
                  type="text"
                  placeholder="palabra nueva"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={editWord.spa}
                  onChange={(e) => setEditWord({ ...editWord, spa: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="fra" />
                <input
                  type="text"
                  placeholder="nouveau mot"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={editWord.fra}
                  onChange={(e) => setEditWord({ ...editWord, fra: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flag flag="ita" />
                <input
                  type="text"
                  placeholder="nuova parola"
                  className="border border-eng px-2 text-black rounded-sm mr-2"
                  value={editWord.ita}
                  onChange={(e) => setEditWord({ ...editWord, ita: e.target.value })}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                {!isConfirm ? (
                  <button
                    className="bg-secondary p-2 m-3 rounded-sm outline-none"
                    onClick={confirmEdit}>
                    Confirm
                  </button>
                ) : (
                  <>
                    <div className="bg-green-400 p-2 m-3 rounded-sm">Word is updated!</div>
                    <Link href="/mywords/check" passHref>
                      <button className="bg-primary p-2 m-3 rounded-sm outline-none">Back</button>
                    </Link>
                  </>
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

export default EditWordsPage;
