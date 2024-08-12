import classNames from 'classnames';
import React from 'react';

import { Container } from '@components/container';
import { SearchForm } from '@components/search-form';

import styles from './header.module.scss';

interface HeaderProps {
	className?: typeof module;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
	return (
		<header className={classNames(styles.header, className)}>
			<Container>
				<div className={styles.header__search}>
					<SearchForm />
				</div>
			</Container>
		</header>
	);
};
