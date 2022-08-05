import cn from 'classnames';
import style from './style.scss';

const Index = ({ className, children }) => {
	return (
		<article className={cn(className, style.container)}>
			{children}
		</article>
	)
};

export default Index;
