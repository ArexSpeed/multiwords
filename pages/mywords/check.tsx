/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import Search from 'components/Search';
import Flag from 'components/Flag';
import MobileNav from 'components/Nav/MobileNav';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  selectCategoryId,
  selectCategories,
  setCategoryId,
  setWordId,
  selectWords,
  deleteWordControl
} from 'redux/slices/mywordsSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const Checkwords = () => {
  const categoryId = useAppSelector(selectCategoryId);
  const mwCategories = useAppSelector(selectCategories);
  const mwWords = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const [deleteWordId, setDeleteWordId] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const classes = useStyles();

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteWord = (id: string) => {
    dispatch(deleteWordControl(id));
    setOpenDeleteModal(false);
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-row relative w-full p-3 justify-between items-center">
          <div>
            <select
              className="text-md outline-none bg-secondaryLight rounded-sm px-3 dark:bg-secondaryDark"
              onChange={(e) => dispatch(setCategoryId(e.target.value))}>
              {mwCategories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="flex flex-col flex-grow w-full h-[80vh] px-3 justify-between items-center pb-24 overflow-hidden">
          {/* Modal for delete words */}
          <Modal open={openDeleteModal} onClose={handleDeleteClose} className={classes.modal}>
            <div className="flex flex-col justify-around items-center w-[250px] h-[250px] bg-secondaryLight text-black rounded-md">
              <h2>Do you want to delete these words ?</h2>
              <div className="flex flex-row">
                <button
                  className="p-2 items-center mx-1 w-10 bg-red-400 text-white outline-none rounded-sm"
                  onClick={() => handleDeleteWord(deleteWordId)}>
                  YES
                </button>
                <button
                  className="p-2 items-center mx-1 w-10 bg-blue-400 text-white outline-none rounded-sm"
                  onClick={() => setOpenDeleteModal(false)}>
                  NO
                </button>
              </div>
            </div>
          </Modal>
          <div className="flex flex-col w-full h-full justify-start items-start py-2 px-2 border-[1px] border-primary25 rounded-lg overflow-auto">
            <Link href="/mywords/addwords" passHref>
              <button className="bg-secondary p-2 rounded-md">Add words to category</button>
            </Link>
            <table className="border-separate">
              <thead>
                <tr>
                  <th>
                    <Flag flag="eng" />
                  </th>
                  <th>
                    <Flag flag="pol" />
                  </th>
                  <th>
                    <Flag flag="ger" />
                  </th>
                  <th>
                    <Flag flag="ned" />
                  </th>
                  <th>
                    <Flag flag="spa" />
                  </th>
                  <th>
                    <Flag flag="fra" />
                  </th>
                  <th>
                    <Flag flag="ita" />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mwWords
                  .filter((word) => word.categoryId === categoryId)
                  .map((item, i) => (
                    <tr
                      key={item.id}
                      className={`${i % 2 === 0 ? 'bg-gray-200 bg-opacity-25' : ''}`}>
                      <td className="border-l border-eng">{item.eng}</td>
                      <td className="border-l border-pol">{item.pol}</td>
                      <td className="border-l border-ger">{item.ger}</td>
                      <td className="border-l border-ned">{item.ned}</td>
                      <td className="border-l border-spa">{item.spa}</td>
                      <td className="border-l border-fra">{item.fra}</td>
                      <td className="border-l border-ita">{item.ita}</td>
                      <td className="flex flex-row">
                        <Link href="/mywords/editwords" passHref>
                          <button
                            className="bg-primaryLight p-2 m-1 rounded-sm dark:bg-primaryDark"
                            onClick={() => dispatch(setWordId(item.id))}>
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 p-2 m-1 rounded-sm"
                          onClick={() => {
                            setDeleteWordId(item.id);
                            setOpenDeleteModal(true);
                          }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default Checkwords;
