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
				<h1 className={style.title}>
					US must arm Ukraine now
					<br /><span className={style.mobile}>&nbsp;</span>
					before it’s too late
				</h1>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<p>
					"Although the Biden administration has successfully rallied U.S. allies and provided substantial military assistance to Ukraine’s valiant armed forces, it has failed to produce a satisfactory strategic narrative. By providing aid sufficient to produce a stalemate, but not enough to roll back Russian territorial gains, the Biden administration may be unintentionally seizing defeat from the jaws of victory.
				</p>
				<p>
					With the necessary weapons and economic aid, Ukraine can defeat Russia. If it succeeds, our soldiers are less likely to have to risk their lives protecting U.S. treaty allies whom Russia also threatens."
				</p>
				<p>
					This is a public opinion of US 20 top national security experts (<a href="https://thehill.com/opinion/national-security/3605064-us-must-arm-ukraine-now-before-its-too-late/">source</a>).
				</p>

				{country && country !== 'US' &&
					<h1>If you are a US citizen (and have a US address)</h1>
				}

				<div id='can-letter-area-protect-ukraine-now' style='width: 100%'></div>

			</section>
		</Container>
	</>);
}
