import { useEffect } from 'preact/hooks'
import Helmet from 'preact-helmet'
import { FaTelegramPlane, FaEnvelope } from 'react-icons/fa'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import Report from '../report'
import copyToClipboard from '../../tools/copyToClipboard'

let copy = e => {
	e.preventDefault()
	copyToClipboard('.letter_text')
}

export default function Home(props) {
	// console.log('Home', props)

	/**
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */
	useEffect(() => {
		if (window !== undefined && window.location.href.includes('#invite_token')) {
			const { href } = window.location
			window.location.href = `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`
		}
	}, [])

	return (<>
		<Helmet
			script={[
				{ defer: true, src: 'https://platform-api.sharethis.com/js/sharethis.js#property=623222622d10e5001932a789&product=inline-share-buttons', type: "text/javascript" },
				// { defer: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-QQV97F1V5G&l=dataLayer&cx=c', type: 'text/javascript' },
			]}
		/>
		<header>
			<div class="protect_elem">
				<div>Protect Ukraine</div>
				<div>NOW</div>
			</div>
			<div class="container">
				<div class="soc_net">
					{/* <a href="https://t.me/ProtectUkraineNow" target="_blank">
						<FaTelegramPlane />
					</a> */}
					<a href="mailto:protectukrainenow@gmail.com" target="_blank">
						<FaEnvelope />
					</a>
				</div>
			</div>
		</header>

		<section class="main">
			<a href="#emailbody">
				<div class="container">
					<h1>Request your representatives to give more weapons to Ukraine</h1>
					<a className="act-now">ACT NOW<br />click here to send the letter</a>
				</div>
			</a>
		</section>

		<div className="container">
			<br /><br />
			{/* <section className="theatre_sec">
				<div>
					We are very encouraged and grateful for the overwhelming support following Volodymyr Zelenskyy address to U.S. Congress on March 16th.
				</div>
				<br />
				<div>
					<b>
						But Ukraine has a dire and immediate need that has not yet been addressed - protecting Ukrainian civilians from the air attacks.
						Ukraine needs fighter planes to protect civilians from the air raids.
					</b>
				</div>
			</section> */}

			<Report {...props} />

			<section className="letter_sec" id="emailbody">
				Russia fires at will misiles and bombs into densly populated Ukrainian cities killing hundreds and terrorizing millions. Russia can do so with impunity as the Ukrainians don't have  air defence systems capable of intercepting such threats.
				<br /><br />
				Despite what we have been led to believe, the US military aid is insufficient and needs to be substantially increased. From the 20 billion of military assistance allocated by the Congress to be shipped by the end of September less than 20% had been used. Hence, six US senators from both sides of the aisle had sent a request to the Secretary of Defence and Chairman of the Joint Chiefs of Staff urging them to provide air defence systems. Please read <a href="https://www.sullivan.senate.gov/imo/media/doc/20220715_Letter.pdf">their letter</a>.
				<br /><br />
				<div className="title">Send the following letter to your representative in U.S. Congress</div>
				<div className="letter_text">
					<div className="greet">
						Dear [name of the representative],
					</div>
					<br />
					It’s been five months since the beginning of the illegal and unprovoked  Russian attack on Ukraine.  I am very disappointed by the handling of this war by the US government.  The amount of  the “committed” military capabilities for Ukraine by the US is averaging under $1.5 bln. per month, but the actual shipment appears to be even less than that.
					<br /><br />
					From the $20 bln. of military aid authorized by the Congress under the Additional Ukraine Supplemental Appropriations Act in May 2022, the White House has used less than $4 bln.  As a result, Ukraine is losing its territories and people, including civilians, women and children among them. 
					<br /><br />
					A number of Senators from both sides of the aisle, including Sen. Dan Sullivan, Tammy Duckworth , Roger Wicker, Richard Blumenthal, and Robert Portman have addressed President Biden to expedite military assistance for Ukraine.  I urge you to join their ranks and request the White House and DoD to immediately send more military equipment to Ukraine as appropriated by the Congress.  According to the group of senators, equipment needed for immediate delivery includes medium- and long-range air defense systems, 155 mm howitzers, High Mobility Artillery Rocket Systems (HIMARS), armored personnel carriers, larger and more capable unmanned aircraft systems (UAS), and Mi-17 helicopters.
					<br /><br />
					According to Fareed Zakaria, who I tend to agree with, the appeasement of the totalitarian Russian regime will lead to an energy supply collapse during the coming winter and a likely annexation of Taiwan by China.  In my opinion, the military capabilities shipment to Ukraine is not only our moral obligation but a pragmatic necessity to avoid a future world chaos.				
					<br /><br />
					<div className="bst_wishes">
						Sincerely,<br />
						[your name]
					</div>
				</div>
				{/* <div className="copy_btn" onClick={() => copyToClipboard('.letter_text')}>
					COPY TO CLIPBOARD
				</div> */}
			</section>
			<section className="parts_sec">
				<div className="part part2 part_flex_wrap" id="sendletter">
					<div className="left_part">
						<div className="content">
							<p>For Senate</p>
							<ul>
								<li>1. Go to the <a href="https://www.senate.gov/states/statesmap.htm" target="_blank" rel="noreferrer">Senate site</a></li>
								<li>2. Select your state by clicking on the map</li>
								<li>3. Click Contact link below the senator photo</li>
								<li>4. Send a letter to your representative <a href="#" onClick={copy}>[Copy to Clipboard]</a></li>
								<li>5. Repeat for other representatives as well</li>
								<li>
									<div className="video_el">
										<LiteYouTubeEmbed id="ilwO0oezkCU" webp />
									</div>
									<p className="video_el_note">Quick Help Video</p>
								</li>
							</ul>
						</div>
					</div>
					<div className="border_block border_block_vertical"></div>
					<div className="right_part">
						<div className="content">
							<p>For House</p>
							<ul>
								<li>1. Go to the <a href="https://www.house.gov/representatives/find-your-representative" target="_blank" rel="noreferrer">House site</a></li>
								<li>2. Enter your zip to find your representatives</li>
								<li>3. Click envelope below the photo</li>
								<li>4. Send a letter to your representative <a href="#" onClick={copy}>[Copy to Clipboard]</a></li>
								<li>5. Repeat for other representatives as well</li>
								<li>
									<div className="video_el">
										<LiteYouTubeEmbed id="N6Sm8OwcO4g" webp />
									</div>
									<p className="video_el_note">Quick Help Video</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
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
		
		<footer>
			<div className="container">
				{/* <div className="protect_elem">
					<div>Protect Ukraine</div>
					<div>NOW</div>
				</div> */}
				<div className="text">
					We are a brother and sister, who were raised in Kharkiv, Ukraine. 
					We spent the last 30 years in the US, living the American dream, both with successful careers in high tech. 
					We love and admire the US and the principles on which it is built. 
					But now our focus is to help our beautiful Ukraine survive and win.
				</div>
				<div className="owners">
					- Sergey &amp; Galina Lubarsky
				</div>
			</div>
		</footer>
	</>)
}

