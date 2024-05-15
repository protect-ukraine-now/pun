import Markdown from 'markdown-to-jsx'

import style from './style.module.scss'
import Container from '@components/Container'
import Article from '@components/Article'
import { useText } from '@tools/language'

export default function About() {
	const text = useText()
	const content = text('methodology.content')
	// return content
	return <>
		<Container className={style.container}>
			<Article>
				<Markdown>
					{content}
				</Markdown>
			</Article>
		</Container>
	</>
}
