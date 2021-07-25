import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type UserLanguageType = {
  short: string;
  name: string;
};

type LearnLanguageType = {
  [key: string]: boolean;
};

interface SettingsState {
  userLanguage: UserLanguageType;
  learnLanguages: LearnLanguageType;
}

const initialState: SettingsState = {
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
    changeUserLanguage: (state, action: PayloadAction<UserLanguageType>) => {
      state.userLanguage = action.payload;
    },
    changeLearningLanguages: (state, action: PayloadAction<keyof LearnLanguageType>) => {
      const lang = action.payload;
      state.learnLanguages[lang] = !state.learnLanguages[lang];
    }
  }
});

export const { changeUserLanguage, changeLearningLanguages } = settingsSlice.actions;

export const UserLanguage = (state: RootState) => state.settings.userLanguage;
export const LearningLanguages = (state: RootState) => state.settings.learnLanguages;

export default settingsSlice.reducer;
