import cn from 'classnames';
import Helmet from 'preact-helmet';
import copyToClipboard from '../../tools/copyToClipboard';
import Container from '../../components/Container';
import style from './style.scss';

const copy = what => e => {
	e.preventDefault();
	copyToClipboard(what);
};

export default function Letter(props) {
	// console.log('Letter', props)
	return (<>
		<Helmet
			link={[
				{ href: 'https://actionnetwork.org/css/style-embed-v3.css', rel: 'stylesheet', type: 'text/css' },
			]}
			script={[
				{ defer: true, src: 'https://actionnetwork.org/widgets/v5/letter/protect-ukraine-now?format=js&source=widget', type: 'text/javascript' },
				// { defer: true, src: 'https://platform-api.sharethis.com/js/sharethis.js#property=623222622d10e5001932a789&product=inline-share-buttons', type: 'text/javascript' },
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
				{/* <h1 className={style.title}>REQUEST YOUR REPRESENTATIVES IN U.S. CONGRESS TO GIVE MORE WEAPONS TO UKRAINE</h1> */}

				<div id='can-letter-area-protect-ukraine-now' style='width: 100%'></div>

				{/* <ol className={style.actionsList}>
					<li className={style.actionItem}>
						Go to the {' '}
						<a href="https://democracy.io/" target="_blank" rel="noreferrer" title="Democracy.io">
							Democracy.io
						</a> site
					</li>
					<li className={style.actionItem}>
						Follow instructions
					</li>
					<li className={style.actionItem}>
						Enter "<span id="subject">Protect Ukraine NOW</span>" into the SUBJECT field when asked{' '}
						<br />
						<a className={style.toClipboardAction} href="#" onClick={copy('#subject')} title="Click here to copy the subject">
							[Click to Copy into Clipboard]<icon />
						</a>
					</li>
					<li className={style.actionItem}>
						Copy and paste the following letter text into the MESSAGE field when asked{' '}
						<br />
						<a className={style.toClipboardAction} href="#" onClick={copy('#emailbody')} title="Click here to copy the letter text">
							[Click to Copy into Clipboard]<icon />
						</a>
					</li>
				</ol>
				<h1 className={style.title}>THE LETTER TO YOUR REPRESENTATIVES</h1> */}
			</section>
			{/* <section className={cn(style.section, style.letter)}>
				<div id="emailbody">
					<p>
						It’s been five months since the beginning of the illegal and unprovoked Russian attack on Ukraine. From the
						$20 bln. of military aid authorized by the Congress under the Additional Ukraine Supplemental Appropriations
						Act, the White House has used less than $4 bln. As a result, Ukraine is losing its territories and people,
						including civilians, women and children among them.
					</p>
					<p>
						Six senators from both sides of the aisle including Richard Blumenthal and Lindsey O. Graham on July 15th
						have
						addressed the Secretary of Defense to expedite military assistance for Ukraine. I urge you to join their
						ranks
						and request the White House and DoD to immediately send more military equipment to Ukraine as appropriated
						by
						the Congress. According to the group of senators, equipment needed for immediate delivery includes C-RAM
						systems, fourth-generation fighter aircraft, larger and more capable unmanned aircraft systems (UAS).
					</p>
					<p>
						According to Fareed Zakaria, who I tend to agree with, the appeasement of the totalitarian Russian regime
						will
						lead to an energy supply collapse during the coming winter and a likely annexation of Taiwan by China. In my
						opinion, the military capabilities shipment to Ukraine is not only our moral obligation but a pragmatic
						necessity to avoid a future world chaos.
						<br />
						<br />
					</p>
				</div>
			</section>
			<section className={cn(style.section, style.social)}>
				<h1>AFTER YOU ARE DONE PLEASE SHARE THIS SITE WITH YOUR FRIENDS, FAMILY AND ON SOCIAL NETWORKS</h1>
				<div className={style.socialActions}>
					<div className="sharethis-inline-share-buttons" />
				</div>
			</section> */}
		</Container>
	</>);
}
