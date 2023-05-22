import Markdown from 'markdown-to-jsx'

import style from './style.scss'
import Container from 'src/components/Container'
import Article from 'src/components/Article'
import { useText } from 'src/tools/language'

export default function About() {
	const text = useText()
	const content = text('about.content')
	// return content
	return <>
		<Container>
			<Article>
				<Markdown>
					{content}
				</Markdown>
			</Article>
		</Container>
	</>
}
