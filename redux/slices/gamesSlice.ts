import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type MemoState = {
  level: string;
  category: string;
  wordsQty: number;
  firstLang: string;
  secondLang: string;
};
type ConnectLanguageType = {
  [key: string]: boolean;
};

type ConnectState = {
  level: string;
  category: string;
  wordsQty: number;
};

const initialState = {
  memoState: {
    level: '1',
    category: 'Numbers',
    wordsQty: 10,
    firstLang: 'eng',
    secondLang: 'eng'
  },
  connectState: {
    level: '1',
    category: 'Numbers',
    wordsQty: 10
  },
  connectLanguages: {
    eng: false,
    pol: false,
    ger: false,
    ned: false,
    spa: false,
    fra: false,
    ita: false
  }
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setMemoState: (state, action: PayloadAction<MemoState>) => {
      state.memoState = action.payload;
    },
    setConnectState: (state, action: PayloadAction<ConnectState>) => {
      state.connectState = action.payload;
    },
    setConnectLanguages: (state, action: PayloadAction<keyof ConnectLanguageType>) => {
      const lang = action.payload;
      state.connectLanguages[lang] = !state.connectLanguages[lang];
    }
  }
});

export const { setMemoState, setConnectState, setConnectLanguages } = gamesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMemoState = (state: RootState) => state.games.memoState;
export const selectConnectState = (state: RootState) => state.games.memoState;
export const selectConnectLanguages = (state: RootState) => state.games.memoState;

export default gamesSlice.reducer;
