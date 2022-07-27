import { Match } from 'preact-router/match';
import Menu from '../Menu';

const Index = ({ items, className, linkClassName, activeClassName, onClick }) => (
	<Match>
		{({ url }) => (
			<Menu
				onClick={onClick}
				className={className}
				activeClassName={activeClassName}
				linkClassName={linkClassName}
				items={items(url)}
			/>
		)}
	</Match>
);

export default Index;
