import { usePrerenderData } from '@preact/prerender-data-provider';
import Markdown from 'markdown-to-jsx';

import style from './style.scss';
import Container from '../../components/Container';
import Dashboard from '../../components/Dashboard';
import Article from '../../components/Article';
import News from '../../components/News'

export default function Report(props) {
	const [data, isLoading] = usePrerenderData(props);
	if (isLoading) return <div style={{ height: '200%' }} />
	// console.log('Report', props, data)
	const { blog } = data.data;
	return (
		<>
			<Container className={style.container}>
				<Dashboard {...data.data} />
			</Container>
			<Container className={style.digest}>
				<Article>
					<News {...data.data} />
					<Markdown>{blog}</Markdown>
				</Article>
			</Container>
		</>
	);
}
