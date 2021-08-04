import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type MemoState = {
  level: string;
  category: string;
  wordsQty: number;
  firstLang: string;
  secondLang: string;
};

const initialState = {
  memoState: {
    level: '1',
    category: 'Numbers',
    wordsQty: 10,
    firstLang: 'eng',
    secondLang: 'eng'
  }
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setMemoState: (state, action: PayloadAction<MemoState>) => {
      state.memoState = action.payload;
    }
  }
});

export const { setMemoState } = gamesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMemoState = (state: RootState) => state.games.memoState;

export default gamesSlice.reducer;
