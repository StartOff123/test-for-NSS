import classNames from 'classnames';
import { Loader2 } from 'lucide-react';

import { RepositoryLanguages } from '@components/repository-languages';
import { StarSvg } from '@components/star';

import { useAppSelector } from '@hooks/use-app-selector';

import styles from './repository.module.scss';

interface RepositoryProps {
	className?: typeof module;
}

export const Repository: React.FC<RepositoryProps> = ({ className }) => {
	const { isError, isLoading, repository } = useAppSelector(
		(state) => state.repository
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
	if (isLoading) {
		return (
			<div className={styles.loading}>
				<Loader2 className={styles.loader} size={40} />
			</div>
		);
	}

	// Если репозитории не найдены
	if (!repository) {
		return (
			<div className={styles.start}>
				<p>Выберите репозиторий</p>
			</div>
		);
	}

	return (
		<div className={classNames(styles.repository, className)}>
			<h1 className={styles.title}>{repository?.name}</h1>
			<div className={styles.content}>
				<p className={styles.language}>
					{/* Проверка на наличие языка */}
					{repository.language ? repository.language : 'Язык не определен'}
				</p>
				<div className={styles.stargazers}>
					<StarSvg />
					<p>{repository?.stargazers_count}</p>
				</div>
			</div>
			<RepositoryLanguages repository_full_name={repository?.full_name} />
			<div className={styles.license}>
				{/* Проверка на наличие лицензии */}
				{repository?.license ? (
					<p>{repository.license.spdx_id} license</p>
				) : (
					<p>Лицензия отсутствует</p>
				)}
			</div>
		</div>
	);
};
