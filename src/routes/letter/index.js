import Helmet from 'preact-helmet'
import copyToClipboard from '../../tools/copyToClipboard'

const copy = e => {
	e.preventDefault()
	copyToClipboard('.letter_text')
}

export default function Letter(props) {
	// console.log('Letter', props)
	return (<>
		<Helmet
			script={[
				{ defer: true, src: 'https://platform-api.sharethis.com/js/sharethis.js#property=623222622d10e5001932a789&product=inline-share-buttons', type: "text/javascript" },
			]}
		/>
		<div className="container">
			<section className="letter_sec" id="emailbody">
				Russia fires at will misiles and bombs into densly populated Ukrainian cities killing hundreds and terrorizing millions. Russia can do so with impunity as the Ukrainians don't have  air defense systems capable of intercepting such threats.
				<br /><br />
				Despite what we have been led to believe, the US military aid is insufficient and needs to be substantially increased. From the 20 billion of military assistance allocated by the Congress to be shipped by the end of September less than 20% had been used. Hence, six US senators from both sides of the aisle had sent a request to the Secretary of Defense and Chairman of the Joint Chiefs of Staff urging them to provide air defense systems. Please read <a href="https://www.sullivan.senate.gov/imo/media/doc/20220715_Letter.pdf">their letter</a>.
				<br /><br />
				<div className="title">Send the following letter to your representative in U.S. Congress</div>
				<div className="letter_text">
					<br />
					It’s been five months since the beginning of the illegal and unprovoked Russian attack on Ukraine. From the $20 bln. of military aid authorized by the Congress under the Additional Ukraine Supplemental Appropriations Act, the White House has used less than $4 bln. As a result, Ukraine is losing its territories and people, including civilians, women and children among them.
					<br /><br />
					Six senators from both sides of the aisle including Richard Blumenthal and Lindsey O. Graham on July 15th have addressed the Secretary of Defense to expedite military assistance for Ukraine. I urge you to join their ranks and request the White House and DoD to immediately send more military equipment to Ukraine as appropriated by the Congress. According to the group of senators, equipment needed for immediate delivery includes C-RAM systems,  fourth-generation fighter aircraft, larger and more capable unmanned aircraft systems (UAS).
					<br /><br />
					According to Fareed Zakaria, who I tend to agree with, the appeasement of the totalitarian Russian regime will lead to an energy supply collapse during the coming winter and a likely annexation of Taiwan by China. In my opinion, the military capabilities shipment to Ukraine is not only our moral obligation but a pragmatic necessity to avoid a future world chaos.
					<br /><br />
					<div className="bst_wishes">
						Best wishes.
					</div>
				</div>
			</section>
			<section className="parts_sec">
				<ul>
					<li>1. <a href="#" onClick={copy}>Copy the letter to Clipboard</a></li>
					<li>2. Go to the <a href="https://www.senate.gov/states/statesmap.htm" target="_blank" rel="noreferrer">Democracy.io</a> site</li>
					<li>3. Follow instructions. Paste the letter body from Clipboard in the corresponding input</li>
				</ul>
			</section>
			<section className="social_sec">
				<h3>After you are done please share this site with your friends, family and on social networks</h3>
				<div className="social_buttons">
					<div className="sharethis-inline-share-buttons" />
				</div>
				<div className="save_block">
					<div>Together we can save</div>
					<div>Ukrainian lives!</div>
					<div className="flag">
						<div className="blue" />
						<div className="yellow" />
					</div>
				</div>
			</section>
		</div>
	</>)
}