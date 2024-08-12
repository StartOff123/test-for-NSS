import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import classNames from 'classnames';
import React from 'react';

import { Container } from '@components/container';

import { useAppDispatch } from '@hooks/use-app-dispatch';
import { useAppSelector } from '@hooks/use-app-selector';

import { fetchRepositories } from '@redux/slices/repositories';
import { fetchRepository } from '@redux/slices/repository';

import { IRepositoryLocal } from '@rootTypes/common';

import { columns } from '@static/common';

import styles from './repositories-table.module.scss';

interface RepositoriesTableProps {
	className?: typeof module;
}

export const RepositoriesTable: React.FC<RepositoriesTableProps> = ({
	className
}) => {
	// Ref монтирования
	const mounted = React.useRef(false);

	const dispatch = useAppDispatch();

	const { repositories, searchValue, isLoading, total_count } = useAppSelector(
		(state) => state.repositories
	);

	// Стейт пагинации
	const [paginationModel, setPaginationModel] =
		React.useState<GridPaginationModel>({
			page: 1,
			pageSize: 10
		});

	// Функция выбора строки в таблице
	const onSelectRow = (row: IRepositoryLocal) => {
		dispatch(fetchRepository(row.full_name));
	};

	// useEffect выполняется при изменении пагинации для получения актуального списка репозиториев
	// Также проверяет на монтирование для того, чтобы не отправлять запрос при монтировании компонента
	React.useEffect(() => {
		// Проверка на монтирование
		if (mounted.current) {
			// Запрос на получение репозиториев с учетом пагинации
			dispatch(
				fetchRepositories({
					name: searchValue,
					page: paginationModel.page,
					per_page: paginationModel.pageSize
				})
			);
		}

		// Монтирование
		mounted.current = true;
	}, [paginationModel]);

	return (
		<Container className={styles.container}>
			<h1 className={styles.title}>Результаты поиска</h1>
			<div className={classNames(styles.table, className)}>
				{/* Таблица */}
				<DataGrid
					loading={isLoading}
					rows={repositories!}
					columns={columns}
					onRowClick={({ row }: { row: IRepositoryLocal }) => onSelectRow(row)}
					pagination
					onPaginationModelChange={setPaginationModel}
					initialState={{
						pagination: {
							rowCount: total_count,
							paginationModel
						}
					}}
					rowCount={total_count}
					paginationMode="server"
					pageSizeOptions={[10]}
				/>
			</div>
		</Container>
	);
};
