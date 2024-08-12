import classNames from 'classnames';
import { Loader2 } from 'lucide-react';

import { RepositoriesTable } from '@components/repositories-table';
import { Repository } from '@components/repository';

import { useAppSelector } from '@hooks/use-app-selector';

import styles from './data-view.module.scss';

interface DataViewProps {
	className?: typeof module;
}

export const DataView: React.FC<DataViewProps> = ({ className }) => {
	// Получаем данные из хранилища
	const { isError, isLoading, repositories, searchValue } = useAppSelector(
		(state) => state.repositories
	);

	// Если произошла ошибка при загрузке данных
	if (isError) {
		return (
			<div className={styles.error}>
				<p>Произошла ошибка при загрузке данных</p>
			</div>
		);
	}

	// Если данные загружаются
	if (isLoading && (!repositories || repositories.length === 0)) {
		return (
			<div className={styles.loading}>
				<Loader2 className={styles.loader} size={40} />
			</div>
		);
	}

	// Если репозитории не найдены
	if (repositories?.length === 0) {
		return (
			<div className={styles.empty}>
				<p>Ничего не найдено</p>
			</div>
		);
	}

	// Добро пожалдовать
	if (!repositories || searchValue === '') {
		return (
			<div className={styles.welcome}>
				<p>Добро пожаловать</p>
			</div>
		);
	}

	return (
		<div className={classNames(styles.data_view, className)}>
			<RepositoriesTable />
			<Repository />
		</div>
	);
};
