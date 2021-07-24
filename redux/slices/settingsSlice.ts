import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type Languages = 'eng' | 'pol' | 'ger' | 'ned' | 'spa' | 'fra' | 'ita';
interface SettingsState {
  userLanguage: Languages;
  learnLanguages: Object;
}

const initialState: SettingsState = {
  userLanguage: 'eng',
  learnLanguages: {
    eng: false,
    pol: false,
    ger: true,
    ned: false,
    spa: true,
    fra: false,
    ita: true
  }
};

export const settingsSlice = createSlice({
  name: 'settings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeUserLanguage: (state, action: PayloadAction<Languages>) => {
      state.userLanguage = action.payload;
    }
  }
});

export const { changeUserLanguage } = settingsSlice.actions;

export const UserLanguage = (state: RootState) => state.settings.userLanguage;
export const LearningLanguages = (state: RootState) => state.settings.learnLanguages;

export default settingsSlice.reducer;
