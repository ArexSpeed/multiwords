import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type Categories = {
  id: string;
  name: string;
};

interface MyWordsState {
  categories: Categories[];
}

// Define the initial state using that type
const initialState: MyWordsState = {
  categories: [
    {
      id: 'asdasd',
      name: 'Music'
    }
  ]
};

export const mywordsSlice = createSlice({
  name: 'mywords',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Categories>) => {
      state.categories = [...state.categories, action.payload];
      console.log(action.payload, 'payload');
    },
    editCategoryControl: (state, action: PayloadAction<Categories>) => {
      const categoryEdit = state.categories.filter((category) => category.id !== action.payload.id);
      categoryEdit.push(action.payload);
      state.categories = categoryEdit;
    },
    deleteCategoryControl: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    }
  }
});

export const { addCategory, editCategoryControl, deleteCategoryControl } = mywordsSlice.actions;

export const selectCategories = (state: RootState) => state.mywords.categories;

export default mywordsSlice.reducer;
