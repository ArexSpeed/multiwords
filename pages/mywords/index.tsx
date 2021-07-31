import { useState } from 'react';
import Link from 'next/link';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import Flag from 'components/Flag';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import slice
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setCategory, setLevel } from 'redux/slices/learnSlice';
import { LearningLanguages, changeLearningLanguages } from 'redux/slices/settingsSlice';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const MyWordsPage = () => {
  const dispatch = useAppDispatch();
  const learnLanguages = useAppSelector(LearningLanguages);
  const [settingBox, setSettingBox] = useState(false);
  const [moreBox, setMoreBox] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const classes = useStyles();

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDispatch = (level: number, category: string) => {
    dispatch(setLevel(level));
    dispatch(setCategory(category));
  };

  const langs = ['eng', 'pol', 'ger', 'ned', 'spa', 'fra', 'ita'];
  const checkLearningLanguage = (lang: string) => {
    dispatch(changeLearningLanguages(lang));
  };

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col relative font-baloo dark:bg-gray-700 dark:text-gray-100">
      <MetaHead />
      <main className="w-full max-h-screen">
        <Search />
        <section className="flex flex-col w-full p-3">
          <div className="flex flex-row justify-between items-center">
            <h4 className="text-md">My words cateogries:</h4>
            <button className="outline-none" onClick={() => setSettingBox(!settingBox)}>
              <SettingsIcon style={{ fontSize: '20px' }} />
            </button>
          </div>
          {settingBox && (
            <div className="flex flex-col justify-start items-center w-full h-auto p-2 bg-secondaryLight rounded-sm dark:bg-secondaryDark">
              <div className="flex flex-row">
                <h4>Show languages:</h4>
              </div>
              <div className="flex flex-row justify-start items-center overflow-x-auto">
                {langs.map((lang, i) => (
                  <label
                    key={i}
                    className="flex flex-col justify-center items-center cursor-pointer">
                    <Flag flag={lang} />
                    <input
                      type="checkbox"
                      defaultChecked={learnLanguages[lang]}
                      onChange={() => checkLearningLanguage(lang)}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>
        <section className="flex flex-col w-full p-3 justify-between items-center pb-24 dark:bg-gray-700">
          <button
            className="h-16 my-2 flex flex-row justify-between items-center bg-secondary rounded-md"
            onClick={handleOpen}>
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-secondaryDark">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="px-2">Add new category</span>
          </button>
          <Modal open={openModal} onClose={handleClose} className={classes.modal}>
            <div className="flex flex-col justify-around items-center w-[250px] h-[250px] bg-secondaryLight text-black rounded-md">
              <h2>Category Name</h2>
              <input
                type="text"
                className="p-2"
                placeholder="Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className="p-2 items-center bg-secondaryDark text-white outline-none rounded-sm"
                onClick={handleClose}>
                ADD
              </button>
            </div>
          </Modal>
          <div className="flex flex-row relative w-full justify-between items-center p-2 border-b-2 border-secondary border-opacity-20">
            <p className="text-lg">Category</p>
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
              <div className="flex flex-col absolute top-14 right-0 justify-start items-start p-2 bg-primaryLight dark:bg-primaryDark">
                <button className="outline-none">Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default MyWordsPage;
