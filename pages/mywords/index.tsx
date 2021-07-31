import { useState } from 'react';
import MetaHead from 'components/MetaHead';
import MobileNav from 'components/Nav/MobileNav';
import Search from 'components/Search';
import Flag from 'components/Flag';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SettingsIcon from '@material-ui/icons/Settings';
//import slice
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setCategory, setLevel } from 'redux/slices/learnSlice';
import { LearningLanguages, changeLearningLanguages } from 'redux/slices/settingsSlice';
import { v4 as uuidv4 } from 'uuid';
import WordsCategory from 'components/WordsCategory';

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
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState({
    id: '',
    name: ''
  });
  const [deleteCategory, setDeleteCategory] = useState({
    id: '',
    name: ''
  });
  const classes = useStyles();
  const [categories, setCategories] = useState([
    {
      id: 'aabbcc',
      name: 'Music'
    },
    {
      id: 'xxffdd',
      name: 'Colors'
    }
  ]);

  const addNewCategory = () => {
    setCategories((prev) => [...prev, { id: uuidv4(), name: newCategory }]);
    setNewCategory('');
    handleAddClose();
    console.log(categories, 'categories');
  };

  const handleEditCategory = (id: string) => {
    const editName = categories.filter((category) => category.id !== id);
    editName.push({
      id: id,
      name: editCategory.name
    });
    setCategories(editName);
    handleEditClose();
  };

  const handleDeleteCategory = (id: string) => {
    const categoryNew = categories.filter((category) => category.id !== id);
    setCategories(categoryNew);
    handleDeleteClose();
  };

  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
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
            onClick={handleAddOpen}>
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
          <Modal open={openAddModal} onClose={handleAddClose} className={classes.modal}>
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
                onClick={addNewCategory}>
                ADD
              </button>
            </div>
          </Modal>
          <Modal open={openEditModal} onClose={handleEditClose} className={classes.modal}>
            <div className="flex flex-col justify-around items-center w-[250px] h-[250px] bg-secondaryLight text-black rounded-md">
              <h2>Edit category</h2>
              <input
                type="text"
                className="p-2"
                placeholder="Edit"
                value={editCategory.name}
                onChange={(e) =>
                  setEditCategory({
                    id: editCategory.id,
                    name: e.target.value
                  })
                }
              />
              <button
                className="p-2 items-center bg-secondaryDark text-white outline-none rounded-sm"
                onClick={() => handleEditCategory(editCategory.id)}>
                EDIT
              </button>
            </div>
          </Modal>
          <Modal open={openDeleteModal} onClose={handleDeleteClose} className={classes.modal}>
            <div className="flex flex-col justify-around items-center w-[250px] h-[250px] bg-secondaryLight text-black rounded-md">
              <h2>
                Do you want to delete <strong>{deleteCategory.name}</strong> ?
              </h2>
              <button
                className="p-2 items-center bg-red-400 text-white outline-none rounded-sm"
                onClick={() => handleDeleteCategory(deleteCategory.id)}>
                DELETE
              </button>
            </div>
          </Modal>
          {categories.map((category, i) => (
            <WordsCategory
              key={i}
              category={category}
              setOpenEditModal={setOpenEditModal}
              setEditCategory={setEditCategory}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteCategory={setDeleteCategory}
            />
          ))}
        </section>
        <MobileNav />
      </main>
    </div>
  );
};

export default MyWordsPage;
