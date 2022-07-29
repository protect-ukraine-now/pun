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
			script={[
				{
					defer: true,
					src: 'https://platform-api.sharethis.com/js/sharethis.js#property=623222622d10e5001932a789&product=inline-share-buttons',
					type: 'text/javascript'
				}
			]}
		/>
		<Container className={style.container}>
			<section className={cn(style.section, style.banner)}>
				<h1 className={style.title}>
					TOGETHER WE CAN SAVE
					<br /><span className={style.mobile}>&nbsp;</span>
					UKRAINIAN LIVES!
				</h1>
			</section>
			<section className={cn(style.section, style.parts)}>
				<ol className={style.actionsList}>
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
						<a href="#" onClick={copy('#subject')} title="Click here to copy the subject">
							[Click here to Copy into Clipboard]
						</a>
					</li>
					<li className={style.actionItem}>
						Copy and paste the letter text into the MESSAGE field when asked{' '}
						<a href="#" onClick={copy('#emailbody')} title="Click here to copy the letter text">
							[Click here to Copy into Clipboard]
						</a>
					</li>
				</ol>
			</section>
			<section className={cn(style.section, style.letter)}>
				<p>
					Russia fires at will missiles and bombs into densely populated Ukrainian cities killing hundreds and terrorizing
					millions. Russia can do so with impunity as the Ukrainians don't have air defense systems capable of
					intercepting such threats.
				</p>
				<p>
					Despite what we have been led to believe, the US military aid is insufficient and needs to be substantially
					increased. From the 20 billion of military assistance allocated by the Congress to be shipped by the end of
					September less than 20% had been used. Hence, six US senators from both sides of the aisle had sent a request
					to the Secretary of Defense and Chairman of the Joint Chiefs of Staff urging them to provide air defense
					systems. Please read <a href="https://www.sullivan.senate.gov/imo/media/doc/20220715_Letter.pdf">their letter</a>.
				</p>
				<h1 className={style.title}>SEND THE FOLLOWING LETTER TO YOUR REPRESENTATIVE IN U.S. CONGRESS</h1>
				<div id="emailbody">
					<p>
						It’s been five months since the beginning of the illegal and unprovoked Russian attack on Ukraine. From the
						$20 bln. of military aid authorized by the Congress under the Additional Ukraine Supplemental Appropriations
						Act, the White House has used less than $4 bln. As a result, Ukraine is losing its territories and people,
						including civilians, women and children among them.
					</p>
					<p>
						Six senators from both sides of the aisle including Richard Blumenthal and Lindsey O. Graham on July 15th have
						addressed the Secretary of Defense to expedite military assistance for Ukraine. I urge you to join their ranks
						and request the White House and DoD to immediately send more military equipment to Ukraine as appropriated by
						the Congress. According to the group of senators, equipment needed for immediate delivery includes C-RAM
						systems, fourth-generation fighter aircraft, larger and more capable unmanned aircraft systems (UAS).
					</p>
					<p>
						According to Fareed Zakaria, who I tend to agree with, the appeasement of the totalitarian Russian regime will
						lead to an energy supply collapse during the coming winter and a likely annexation of Taiwan by China. In my
						opinion, the military capabilities shipment to Ukraine is not only our moral obligation but a pragmatic
						necessity to avoid a future world chaos.
					</p>
					<p>
						Best wishes.
					</p>
				</div>
			</section>
			<section className={cn(style.section, style.social)}>
				<h1>AFTER YOU ARE DONE PLEASE SHARE THIS SITE WITH YOUR FRIENDS, FAMILY AND ON SOCIAL NETWORKS</h1>
				<div className={style.socialActions}>
					<div className="sharethis-inline-share-buttons" />
				</div>
			</section>
		</Container>
	</>);
}
