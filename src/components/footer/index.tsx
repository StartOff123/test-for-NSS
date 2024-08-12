import classNames from 'classnames';

import styles from './footer.module.scss';

interface FooterProps {
	className?: typeof module;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
	return <div className={classNames(styles.footer, className)} />;
};
