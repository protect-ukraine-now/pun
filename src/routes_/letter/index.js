import cn from 'classnames';
import Helmet from 'preact-helmet';
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
					US must arm Ukraine now
					<br /><span className={style.mobile}>&nbsp;</span>
					before it’s too late
				</h2>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<p>
					Russia launched the most unprecedented missile attack across the entire Ukraine targeting critical infrastructure and slaughtering civilians. More than 3600 missiles have been launched on Ukrainian territory. By October, tens of thousands of civilians had been killed, including more than 400 children.
				</p>
				<p>
					As of now not a single air defense system was provided by the US. There is no excuse for this cowardly and heartless position of the White House. Empty pledges and condemnations have not saved a single killed child.
				</p>
				<p>
					Significantly MORE MILITARY AID is needed urgently. Time to act is NOW before more children are killed.​
				</p>
				{country && country !== 'US' &&
					<h2>If you are a US citizen (and have a US address)</h2>
				}

				<div id='can-letter-area-protect-ukraine-now' style='width: 100%'></div>
			</section>
		</Container>
	</>);
}
