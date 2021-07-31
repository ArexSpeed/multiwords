import React, { useState } from 'react';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setCategory, setLevel } from 'redux/slices/learnSlice';
import { LearningLanguages, changeLearningLanguages } from 'redux/slices/settingsSlice';

type Category = {
  name: string;
}

interface Props {
  category: Category;
}

const WordsCategory: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();
  const learnLanguages = useAppSelector(LearningLanguages);
  const [moreBox, setMoreBox] = useState(false);

  const handleDispatch = (level: number, category: string) => {
    dispatch(setLevel(level));
    dispatch(setCategory(category));
  };
  return (
    <div className="flex flex-row relative w-full justify-between items-center p-2 border-b-2 border-secondary border-opacity-20">
      <p className="text-lg">{category.name}</p>
      <div className="flex flex-row justify-around items-center">
        <Link href="/mywords/addwords" passHref>
          <button
            className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
            onClick={() => handleDispatch(Number(1), 'category')}>
            <AddIcon />
          </button>
        </Link>
        <Link href="/mywords/learn" passHref>
          <button
            className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
            onClick={() => handleDispatch(Number(1), 'category')}>
            <ImportContactsIcon />
          </button>
        </Link>
        <Link href="/mywords/write" passHref>
          <button
            className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
            onClick={() => handleDispatch(Number(1), 'category')}>
            <EditIcon />
          </button>
        </Link>
        <Link href="/mywords/show" passHref>
          <button
            className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
            onClick={() => handleDispatch(Number(1), 'category')}>
            <VisibilityOffIcon />
          </button>
        </Link>
        <button
          className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
          onClick={() => setMoreBox(!moreBox)}>
          <MoreVertIcon />
        </button>
      </div>
      {moreBox && (
        <div className="flex flex-col absolute top-14 right-0 z-10 justify-start items-start p-2 bg-primaryLight dark:bg-primaryDark">
          <button className="outline-none">Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
};

export default WordsCategory;
