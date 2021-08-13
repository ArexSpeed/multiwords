import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type MemoState = {
  level: string;
  category: string;
  wordsQty: number;
  firstLang: string;
  secondLang: string;
  playersQty: number;
};
type MemoPlayers = {
  [key: string]: string;
};
type ConnectLanguageType = {
  [key: string]: boolean;
};
type ConnectState = {
  level: string;
  category: string;
  wordsQty: number;
};
type PuzzleState = {
  language: string;
  lettersQty: number;
};

interface GamesState {
  memoState: MemoState;
  memoPlayers: MemoPlayers[];
  connectState: ConnectState;
  connectLanguages: ConnectLanguageType;
  puzzleState: PuzzleState;
}

const initialState: GamesState = {
  memoState: {
    level: '1',
    category: 'Numbers',
    wordsQty: 10,
    firstLang: 'eng',
    secondLang: 'eng',
    playersQty: 1
  },
  memoPlayers: [],
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
  },
  puzzleState: {
    language: 'eng',
    lettersQty: 4
  }
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setMemoState: (state, action: PayloadAction<MemoState>) => {
      state.memoState = action.payload;
    },
    setMemoPlayers: (state, action: PayloadAction<MemoPlayers[]>) => {
      state.memoPlayers = action.payload;
    },
    setConnectState: (state, action: PayloadAction<ConnectState>) => {
      state.connectState = action.payload;
    },
    setConnectLanguages: (state, action: PayloadAction<keyof ConnectLanguageType>) => {
      const lang = action.payload;
      state.connectLanguages[lang] = !state.connectLanguages[lang];
    },
    setPuzzleState: (state, action: PayloadAction<PuzzleState>) => {
      state.puzzleState = action.payload;
    }
  }
});

export const {
  setMemoState,
  setMemoPlayers,
  setConnectState,
  setConnectLanguages,
  setPuzzleState
} = gamesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMemoState = (state: RootState) => state.games.memoState;
export const selectMemoPlayers = (state: RootState) => state.games.memoPlayers;
export const selectConnectState = (state: RootState) => state.games.connectState;
export const selectConnectLanguages = (state: RootState) => state.games.connectLanguages;
export const selectPuzzleState = (state: RootState) => state.games.puzzleState;

export default gamesSlice.reducer;
