import cn from 'classnames';
import style from './style.scss';

const Article = ({ className, children }) => {
	return (
		<article className={cn(className, style.container)}>
			{children}
		</article>
	)
};

export default Article;
