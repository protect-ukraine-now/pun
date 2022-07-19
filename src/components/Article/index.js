import cn from 'classnames';
import Markdown from 'markdown-to-jsx';
import style from './style.scss';

const Index = ({ className, content }) => {
	return content ? (
		<div className={cn(className, style.container)}>
			<Markdown>{content}</Markdown>
		</div>
	) : null;
};

export default Index;
