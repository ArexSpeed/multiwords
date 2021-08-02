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
  categoryId: 'asdasd',
  categories: categoriesStorage(),
  words: [
    {
      id: '1',
      categoryId: 'asdasd',
      pol: 'dwa',
      eng: 'two',
      ger: 'zwei',
      ned: 'twee',
      spa: 'dos',
      fra: 'deux',
      ita: 'due'
    },
    {
      id: '3',
      categoryId: 'asdasd',
      pol: 'trzy',
      eng: 'three',
      ger: 'drei',
      ned: 'drie',
      spa: 'tres',
      fra: 'trois',
      ita: 'tre'
    },
    {
      id: '4',
      categoryId: 'asdasd',
      pol: 'cztery',
      eng: 'four',
      ger: 'vier',
      ned: 'vier',
      spa: 'cuatro',
      fra: 'quatre',
      ita: 'quattro'
    },
    {
      id: '5',
      categoryId: 'asdasd',
      pol: 'pięć',
      eng: 'five',
      ger: 'fünf',
      ned: 'vijf',
      spa: 'cinco',
      fra: 'cinq',
      ita: 'cinque'
    },
    {
      id: '6',
      categoryId: 'asdasd',
      pol: 'sześć',
      eng: 'six',
      ger: 'sechs',
      ned: 'zes',
      spa: 'sies',
      fra: 'six',
      ita: 'sei'
    },
    {
      id: '7',
      categoryId: 'asdasd',
      pol: 'siedem',
      eng: 'seven',
      ger: 'sieben',
      ned: 'zeven',
      spa: 'siette',
      fra: 'sept',
      ita: 'sette'
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
    }
  }
});

export const { addCategory, editCategoryControl, deleteCategoryControl } = mywordsSlice.actions;

export const selectCategoryId = (state: RootState) => state.mywords.categoryId;
export const selectCategories = (state: RootState) => state.mywords.categories;
export const selectWords = (state: RootState) => state.mywords.words;

export default mywordsSlice.reducer;
