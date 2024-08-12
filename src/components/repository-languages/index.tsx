import classNames from 'classnames';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { useAppDispatch } from '@hooks/use-app-dispatch';
import { useAppSelector } from '@hooks/use-app-selector';

import { fetchRepositoryLanguages } from '@redux/slices/repository-languages';

import styles from './repository-languages.module.scss';

interface RepositoryLanguagesProps {
	repository_full_name?: string;
	className?: typeof module;
}

export const RepositoryLanguages: React.FC<RepositoryLanguagesProps> = ({
	repository_full_name,
	className
}) => {
	const dispatch = useAppDispatch();

	const { isError, isLoading, languages } = useAppSelector(
		(state) => state.repositoryLanguages
	);

	// Запрос для получения списка языков репозитория с проверкой на наличие полного именни
	React.useEffect(() => {
		if (repository_full_name)
			dispatch(fetchRepositoryLanguages(repository_full_name));
	}, [repository_full_name]);

	// Если произошла ошибка при загрузке данных
	if (isError) {
		return <p>Произошла ошибка при загрузке данных</p>;
	}

	// Если данные загружаются
	if (isLoading) {
		return <Loader2 className={styles.loader} size={20} />;
	}

	// Если нет языков
	if (Object.keys(languages).length === 0) return null;

	return (
		<div className={classNames(styles.languages, className)}>
			{/* Рендер списка языков */}
			{Object.keys(languages).map((language) => (
				<p className={styles.language} key={language}>
					{language}
				</p>
			))}
		</div>
	);
};
