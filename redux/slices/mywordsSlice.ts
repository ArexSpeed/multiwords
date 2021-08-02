import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { categoriesStorage } from '../storage/mywordsStorage';

type Categories = {
  id: string;
  name: string;
};

type Words = {
  id: string;
  categoryId: string;
  [key: string]: string;
};

interface MyWordsState {
  categoryId: string;
  categories: Categories[];
  words: Words[];
}

// Define the initial state using that type
const initialState: MyWordsState = {
  categoryId: '',
  categories: categoriesStorage(),
  words: []
};

export const mywordsSlice = createSlice({
  name: 'mywords',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    addCategory: (state, action: PayloadAction<Categories>) => {
      state.categories = [...state.categories, action.payload];
      console.log(action.payload, 'payload');
      localStorage.setItem('mywordsCategories', JSON.stringify(state.categories));
    },
    editCategoryControl: (state, action: PayloadAction<Categories>) => {
      const categoryEdit = state.categories.filter((category) => category.id !== action.payload.id);
      categoryEdit.push(action.payload);
      state.categories = categoryEdit;
      localStorage.setItem('mywordsCategories', JSON.stringify(state.categories));
    },
    deleteCategoryControl: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
      localStorage.setItem('mywordsCategories', JSON.stringify(state.categories));
    },
    addWords: (state, action) => {
      state.words = [...state.words, action.payload];
    }
  }
});

export const { setCategoryId, addCategory, editCategoryControl, deleteCategoryControl, addWords } =
  mywordsSlice.actions;

export const selectCategoryId = (state: RootState) => state.mywords.categoryId;
export const selectCategories = (state: RootState) => state.mywords.categories;
export const selectWords = (state: RootState) => state.mywords.words;

export default mywordsSlice.reducer;
