import { Button, TextField } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from '@hooks/use-app-dispatch';

import {
	RepositoriesQuery,
	fetchRepositories,
	setSearchValue
} from '@redux/slices/repositories';

import styles from './search-from.module.scss';

interface SearchFormProps {
	className?: typeof module;
}

// Тип для полей формы
type SearchFormValues = {
	searchValue: string;
};

export const SearchForm: React.FC<SearchFormProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	// Форма поиска с использованием react-hook-form
	const from = useForm<SearchFormValues>({
		defaultValues: {
			searchValue: ''
		}
	});

	// Функция для обработки сабмита формы
	const onSubmit = async ({ searchValue }: SearchFormValues) => {
		try {
			// Если поле поиска пустое, то ничего не делаем
			if (searchValue === '') return;

			// Объект query параметров для запроса
			const query: RepositoriesQuery = {
				name: searchValue,
				page: 1,
				per_page: 10
			};

			// Запрос на получение репозиториев с учетом пагинации
			dispatch(fetchRepositories(query));
			// Перезаем в хранилище данные поиска
			dispatch(setSearchValue(searchValue));
		} catch (error) {
			console.log('Error fetching data ', error);
		}
	};

	return (
		<form
			onSubmit={from.handleSubmit(onSubmit)}
			className={classNames(styles.form, className)}
		>
			<Controller
				control={from.control}
				name="searchValue"
				render={({ field }) => (
					<TextField
						className={styles.input}
						placeholder="Поисковый запрос"
						size="small"
						variant="outlined"
						{...field}
					/>
				)}
			/>
			<Button variant="contained" type="submit">
				Искать
			</Button>
		</form>
	);
};
