import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface LearnState {
  level: number;
  category: string;
}

// Define the initial state using that type
const initialState: LearnState = {
  level: 1,
  category: 'Numbers'
};

export const learnSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    }
  }
});

export const { setLevel, setCategory } = learnSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLevel = (state: RootState) => state.learn.level;
export const selectCategory = (state: RootState) => state.learn.category;

export default learnSlice.reducer;
