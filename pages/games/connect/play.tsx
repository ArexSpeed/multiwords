import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import { useAppSelector } from 'redux/hooks';
import { selectMemoState } from 'redux/slices/gamesSlice';
import FlipCard from 'components/FlipCard';
import { words } from 'data';

type CardInit = {
  id: string;
  lang1: string;
  lang2: string;
};
type Cards = {
  id: string;
  lang: string;
  correct: boolean;
};

const shuffleCards = (array: Array<any>) => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};

const ConnectPlay = () => {
  const [isFinish, setIsFinish] = useState(false);

  return (
    <div className="w-screen min-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full min-h-screen">
        <Link href="/games/memo" passHref>
          <button className="flex flex-row p-2 m-2 bg-primaryLight rounded-md dark:bg-primaryDark">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back</span>
          </button>
        </Link>
        {!isFinish ? (
          <>
            <section className="flex flex-row justify-start items-center w-full overflow-x-auto">
              <div className="flex flex-col justify-center items-center">
                <button className="bg-eng flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word
                </button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word3
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word3
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word3
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word3
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word3
                </button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
                <button className="bg-secondary flex flex-row justify-center items-center w-[150px] h-[70px] m-2 rounded-sm">
                  Word2
                </button>
              </div>
            </section>
          </>
        ) : (
          <section className="flex flex-col justify-center items-center w-full">
            <p>Amazing you found all words!!</p>
            <p>Now you can back to memo with other words</p>
            <Link href="/games/memo" passHref>
              <button className="flex flex-row p-2 m-2 bg-primaryLight rounded-md dark:bg-primaryDark">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Back</span>
              </button>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
};

export default ConnectPlay;
