import moment from 'moment';
import {
	IRepositoriesResponse,
	IRepository,
	IRepositoryLocal
} from 'types/common';

import { instance } from '@services/instance';

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Интерфейс для query параметров
export interface RepositoriesQuery {
	name?: string; // Значение поиска
	per_page?: number; // Количество репозиториев на странице
	page?: number; // Номер страницы
}

// Интерфейс для стейта репозиториев
interface RepositoriesState {
	searchValue: string; // Стейт значения поиска
	total_count: number; // Стейт общего количества репозиториев
	repositories: IRepositoryLocal[] | null; // Стейт списка репозиториев
	isLoading: boolean; // Стейт загрузки
	isError: boolean; // Стейт ошибки
}

// Thunk для получения репозиториев с учетом query параметров
export const fetchRepositories = createAsyncThunk(
	'repositories/fetchRepositories',
	async ({ name, page, per_page }: RepositoriesQuery) => {
		try {
			// Запрос
			const { data } = await instance.get('/search/repositories', {
				params: {
					q: name,
					per_page,
					page
				}
			});
			return data;
		} catch (error) {
			console.log('Error fetching data ', error);
			// Обработка ошибок
			throw error;
		}
	}
);

const initialState: RepositoriesState = {
	searchValue: '',
	total_count: 0,
	repositories: null,
	isLoading: false,
	isError: false
};

export const repositoriesSlice = createSlice({
	name: 'repositories',
	initialState,
	reducers: {
		// Изменение значения поиска
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		}
	},
	extraReducers: (builder) => {
		// Обработка запроса при статусе pending
		builder.addCase(fetchRepositories.pending, (state) => {
			// Обновление стейта загрузки
			state.isLoading = true;
		});

		// Обработка запроса при статусе fulfilled
		builder.addCase(
			fetchRepositories.fulfilled,
			(state, action: PayloadAction<IRepositoriesResponse>) => {
				// Обновление стейта загрузки
				state.isLoading = false;

				// Преобразование данных для списка репозиториев
				const repositories: IRepositoryLocal[] = action.payload.items.map(
					(item: IRepository) => {
						return {
							id: item.id,
							name: item.name,
							language: item.language,
							full_name: item.full_name,
							forks_count: item.forks_count,
							stargazers_count: item.stargazers_count,
							updated_at: moment(item.updated_at).format('DD.MM.YYYY')
						};
					}
				);

				// Обновление списка репозиториев
				state.repositories = repositories;
				// Обновление общего количества репозиториев
				state.total_count = action.payload.total_count;
			}
		);

		// Обработка запроса при статусе rejected
		builder.addCase(fetchRepositories.rejected, (state) => {
			// Обновление стейта загрузки
			state.isLoading = false;
			// Обновление стейта ошибки
			state.isError = true;
		});
	}
});

export const { setSearchValue } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
