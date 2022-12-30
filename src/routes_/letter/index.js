import cn from 'classnames';
import Helmet from 'preact-helmet';
import Markdown from 'markdown-to-jsx'
import { translate } from '../../tools/language'

import Article from '../../components/Article'
import detectCountry from '../../tools/detectCountry';
import Container from '../../components/Container';
import style from './style.scss';

export default function Letter() {
	let country = detectCountry()
	return (<>
		<Helmet
			link={[
				{ href: 'https://actionnetwork.org/css/style-embed-v3.css', rel: 'stylesheet', type: 'text/css' },
			]}
			script={[
				{ defer: true, src: 'https://actionnetwork.org/widgets/v5/letter/protect-ukraine-now?format=js&source=widget', type: 'text/javascript' },
			]}
		/>
		<Container className={style.container}>
			<section className={cn(style.section, style.banner)}>
				<h2 className={style.title}>
					{translate('letter.header')}
					<br /><span className={style.mobile}>&nbsp;</span>
				</h2>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<Article>
					<Markdown>
						{translate('letter.description')}
					</Markdown>
				</Article>
				<br />
				{country && country !== 'US' &&
					<h3>(if you are a U.S. citizen and have a U.S. address)</h3>
				}
				<div id='can-letter-area-protect-ukraine-now' style='width: 100%'></div>
			</section>
		</Container>
	</>);
}
