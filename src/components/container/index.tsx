import classNames from 'classnames';
import React from 'react';

import styles from './container.module.scss';

interface ContainerProps {
	className?: typeof module;
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
	children,
	className
}) => {
	return (
		<div className={classNames(styles.container, className)}>{children}</div>
	);
};
