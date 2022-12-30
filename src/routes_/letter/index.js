import cn from 'classnames';
import Helmet from 'preact-helmet';

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
					Save Ukrainian lives with your Petition!
					<br /><span className={style.mobile}>&nbsp;</span>
				</h2>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<Article>
					<ul>
						<li>Innocent people are killed in their homes every day; on Christmas Eve 17 civilians were killed and 71 were wounded</li>
						<li>The prolonged war in Ukraine will shatter the world stability; we can’t allow the war to evolve into a multiyear conflict</li>
						<li>General Zaloujny is ready to end this war:
							<blockquote>
							“I know that I can beat this enemy. But I need resources. I need 300 tanks, 600-700 IFVs, 500 Howitzers”
							</blockquote>
						</li>
					</ul>
				</Article>
				{country && country !== 'US' &&
					<h2><br />If you are a US citizen (and have a US address)</h2>
				}
				<div id='can-letter-area-protect-ukraine-now' style='width: 100%'></div>
			</section>
		</Container>
	</>);
}
