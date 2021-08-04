import { configureStore } from '@reduxjs/toolkit';
import learnReducer from './slices/learnSlice';
import settingsReducer from './slices/settingsSlice';
import mywordsReducer from './slices/mywordsSlice';
import gamesReducer from './slices/gamesSlice';

export const store = configureStore({
  reducer: {
    learn: learnReducer,
    settings: settingsReducer,
    mywords: mywordsReducer,
    games: gamesReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
