import cn from 'classnames';
import styles from './styles.scss';

const Index = ({ className, children }) => (
	<div className={cn(className, styles.container)}>
		{children}
	</div>
);

export default Index;
