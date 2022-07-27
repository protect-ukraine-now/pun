import { Match } from 'preact-router/match'
import Menu from '../Menu';

const Index = ({ className, items }) => (
	<Match>
		{({ url }) => {
			return <Menu className={className} items={items(url)} />
		}}
	</Match>
);

export default Index;
