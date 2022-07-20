import cn from 'classnames';
import Markdown from 'markdown-to-jsx';
import style from './style.scss';
import { Fragment } from 'preact';

const Index = ({ className, content }) => {
	return content ? (
		<article className={cn(className, style.container)}>
			<Markdown options={{ wrapper: Fragment }}>{content}</Markdown>
		</article>
	) : null;
};

export default Index;
