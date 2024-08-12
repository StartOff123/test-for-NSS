import { configureStore } from '@reduxjs/toolkit';

import { repositoriesSlice } from './slices/repositories';
import { repositorySlice } from './slices/repository';
import { repositoryLanguagesSlice } from './slices/repository-languages';

export const store = configureStore({
	reducer: {
		repositories: repositoriesSlice.reducer,
		repository: repositorySlice.reducer,
		repositoryLanguages: repositoryLanguagesSlice.reducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
