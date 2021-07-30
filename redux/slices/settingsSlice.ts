import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
  themeStorage,
  userStorage,
  learnLanguageStorage,
  dicoLanguageStorage
} from '../storage/settingsStorage';

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
  dicoLanguages: LearnLanguageType;
}

const initialState: SettingsState = {
  theme: themeStorage(),
  userLanguage: userStorage(),
  learnLanguages: learnLanguageStorage(),
  dicoLanguages: dicoLanguageStorage()
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toogleTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    changeUserLanguage: (state, action: PayloadAction<UserLanguageType>) => {
      state.userLanguage = action.payload;
      localStorage.setItem('userLanguage', JSON.stringify(action.payload));
    },
    changeLearningLanguages: (state, action: PayloadAction<keyof LearnLanguageType>) => {
      const lang = action.payload;
      state.learnLanguages[lang] = !state.learnLanguages[lang];
      localStorage.setItem('learnLanguage', JSON.stringify(state.learnLanguages));
    },
    changeDicoLanguages: (state, action: PayloadAction<keyof LearnLanguageType>) => {
      const lang = action.payload;
      state.dicoLanguages[lang] = !state.dicoLanguages[lang];
      localStorage.setItem('dicoLanguage', JSON.stringify(state.dicoLanguages));
    }
  }
});

export const { toogleTheme, changeUserLanguage, changeLearningLanguages, changeDicoLanguages } =
  settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const UserLanguage = (state: RootState) => state.settings.userLanguage;
export const LearningLanguages = (state: RootState) => state.settings.learnLanguages;
export const DicoLanguages = (state: RootState) => state.settings.dicoLanguages;

export default settingsSlice.reducer;
