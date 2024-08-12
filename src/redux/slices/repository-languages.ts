import { instance } from '@services/instance';

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Интерфейс для стейта языков
interface RepositoryLanguagesState {
	languages: Record<string, number>; // Стейт языков (поскольку у репозитория могут быть несколько разных языков, то используется Record)
	isLoading: boolean; // Стейт загрузки
	isError: boolean; // Стейт ошибки
}

// Thunk для получения языков репозитория по полному имени репозитория
export const fetchRepositoryLanguages = createAsyncThunk(
	'repository/fetchRepositoryLanguages',
	async (full_name: string) => {
		try {
			// Запрос
			const { data } = await instance.get(`/repos/${full_name}/languages`);
			return data;
		} catch (error) {
			console.log('Error fetching data ', error);
			// Обработка ошибок
			throw error;
		}
	}
);

const initialState: RepositoryLanguagesState = {
	languages: {},
	isLoading: false,
	isError: false
};

export const repositoryLanguagesSlice = createSlice({
	name: 'repositoryLanguages',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Обработка запроса при статусе pending
		builder.addCase(fetchRepositoryLanguages.pending, (state) => {
			// Обновление стейта загрузки
			state.isLoading = true;
		});

		// Обработка запроса при статусе fulfilled
		builder.addCase(
			fetchRepositoryLanguages.fulfilled,
			(state, action: PayloadAction<Record<string, number>>) => {
				// Обновление стейта загрузки
				state.isLoading = false;
				// Обновление списка языков
				state.languages = action.payload;
			}
		);

		// Обработка запроса при статусе rejected
		builder.addCase(fetchRepositoryLanguages.rejected, (state) => {
			// Обновление стейта загрузки
			state.isLoading = false;
			// Обновление стейта ошибки
			state.isError = true;
		});
	}
});

export default repositoryLanguagesSlice.reducer;
