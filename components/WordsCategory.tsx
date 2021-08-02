import React, { useState } from 'react';
import Link from 'next/link';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useAppDispatch } from 'redux/hooks';
import { setCategoryId } from 'redux/slices/mywordsSlice';

type Category = {
  id: string;
  name: string;
};

interface Props {
  category: Category;
  setOpenEditModal: any;
  setEditCategory: any;
  setOpenDeleteModal: any;
  setDeleteCategory: any;
}

const WordsCategory: React.FC<Props> = ({
  category,
  setOpenEditModal,
  setEditCategory,
  setOpenDeleteModal,
  setDeleteCategory
}) => {
  const dispatch = useAppDispatch();
  const [moreBox, setMoreBox] = useState(false);

  const handleDispatch = (id: string) => {
    dispatch(setCategoryId(id));
  };

  const handleEdit = () => {
    setOpenEditModal(true);
    setEditCategory({
      id: category.id,
      name: category.name
    });
    setMoreBox(false);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
    setDeleteCategory({
      id: category.id,
      name: category.name
    });
    setMoreBox(false);
  };

  return (
    <div className="flex flex-row relative w-full justify-between items-center p-2 border-b-2 border-secondary border-opacity-20">
      <p className="text-lg">{category.name}</p>
      <div className="flex flex-row justify-around items-center">
        <Link href="/mywords/words" passHref>
          <button
            className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
            onClick={() => handleDispatch(category.id)}>
            <ImportContactsIcon />
          </button>
        </Link>
        <Link href="/mywords/write" passHref>
          <button
            className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
            onClick={() => handleDispatch(category.id)}>
            <EditIcon />
          </button>
        </Link>
        <Link href="/mywords/show" passHref>
          <button
            className="p-2 hover:bg-primaryLight rounded-full dark:hover:bg-primaryDark"
            onClick={() => handleDispatch(category.id)}>
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
          <Link href="/mywords/addwords" passHref>
            <button className="outline-none" onClick={() => handleDispatch(category.id)}>
              Add new words
            </button>
          </Link>
          <Link href="/mywords/check" passHref>
            <button className="outline-none" onClick={() => handleDispatch(category.id)}>
              Check words
            </button>
          </Link>
          <button className="outline-none" onClick={handleEdit}>
            Edit
          </button>
          <button className="outline-none" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default WordsCategory;
