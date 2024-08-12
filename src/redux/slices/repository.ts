import { IRepository } from 'types/common';

import { instance } from '@services/instance';

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Интерфейс для стейта репозитория
interface RepositoryState {
	repository: IRepository | null; // стейт репозиторий
	isLoading: boolean; // стейт загрузки
	isError: boolean; // стейт ошибки
}

// Thunk для получения репозитория по полному имени
export const fetchRepository = createAsyncThunk(
	'repository/fetchRepository',
	async (full_name: string) => {
		try {
			// Запрос
			const { data } = await instance.get(`/repos/${full_name}`);
			return data;
		} catch (error) {
			// 	Обработка ошибок
			console.log('Error fetching data ', error);
			throw error;
		}
	}
);

const initialState: RepositoryState = {
	repository: null,
	isLoading: false,
	isError: false
};

export const repositorySlice = createSlice({
	name: 'repository',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Обработка запроса при статусе pending
		builder.addCase(fetchRepository.pending, (state) => {
			// Обновление стейта загрузки
			state.isLoading = true;
		});

		// Обработка запроса при статусе fulfilled
		builder.addCase(
			fetchRepository.fulfilled,
			(state, action: PayloadAction<IRepository>) => {
				// Обновление стейта загрузки
				state.isLoading = false;
				// Обновление стейта репозитория
				state.repository = action.payload;
			}
		);

		// Обработка запроса при статусе rejected
		builder.addCase(fetchRepository.rejected, (state) => {
			// Обновление стейта загрузки
			state.isLoading = false;
			// Обновление стейта ошибки
			state.isError = true;
		});
	}
});

export default repositorySlice.reducer;
