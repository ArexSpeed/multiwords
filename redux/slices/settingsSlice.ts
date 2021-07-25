import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type ThemeType = 'light' | 'dark';

type UserLanguageType = {
  short: string;
  name: string;
};

type LearnLanguageType = {
  [key: string]: boolean;
};

interface SettingsState {
  theme: ThemeType;
  userLanguage: UserLanguageType;
  learnLanguages: LearnLanguageType;
}

const initialState: SettingsState = {
  theme: 'light',
  userLanguage: {
    short: 'eng',
    name: 'English'
  },
  learnLanguages: {
    eng: true,
    pol: true,
    ger: true,
    ned: false,
    spa: true,
    fra: true,
    ita: true
  }
};

export const settingsSlice = createSlice({
  name: 'settings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toogleTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    changeUserLanguage: (state, action: PayloadAction<UserLanguageType>) => {
      state.userLanguage = action.payload;
    },
    changeLearningLanguages: (state, action: PayloadAction<keyof LearnLanguageType>) => {
      const lang = action.payload;
      state.learnLanguages[lang] = !state.learnLanguages[lang];
    }
  }
});

export const { toogleTheme, changeUserLanguage, changeLearningLanguages } = settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const UserLanguage = (state: RootState) => state.settings.userLanguage;
export const LearningLanguages = (state: RootState) => state.settings.learnLanguages;

export default settingsSlice.reducer;
