import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type ThemeType = 'light' | 'dark';
interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
  theme: 'light'
};

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toogleTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    }
  }
});

export const { toogleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
