import Markdown from 'markdown-to-jsx'

// import style from './style.scss'
import Container from '../../components/Container'
import Article from '../../components/Article'
import { translate } from '../../tools/language'

export default function About() {
	const app = process.env.PREACT_APP_NAME
	const content = translate(`${app}/about.content`)
	return (
		<Container>
			<Article>
				<Markdown>
					{content}
				</Markdown>
			</Article>
		</Container>
	)
}
