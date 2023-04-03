import Markdown from 'markdown-to-jsx'

// import style from './style.scss'
import Container from '../../components/Container'
import Article from '../../components/Article'
import { translate } from '../../tools/language'

export default function About() {
	return (
		<Container>
			<Article>
				<Markdown>
					{translate(`${process.env.PREACT_APP_NAME}-about.content`)}
				</Markdown>
			</Article>
		</Container>
	)
}
