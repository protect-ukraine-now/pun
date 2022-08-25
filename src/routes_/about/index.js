import cn from 'classnames';
import { Text } from 'preact-i18n';

import logoPUN from '../../assets/images/pun-logo-large--vertical.svg';
import Container from '../../components/Container';

import style from './style.scss';

const About = ({ className }) => {
	return (
		<div className={cn(className)}>
			<h1 className={style.title}><Text id="about.title">About us</Text></h1>
			<section className={style.aboutUs}>
				<Container>
					<div className={style.progectInfo}>
						<h2><Text id="about.project_name">“Protect Ukraine Now” Project</Text></h2>
						<Text id="about.project_description">
							U.S. Senators Dan Sullivan (R-Alaska), and four other senators sent a letter to Defense Secretary Lloyd
							Austin and Chairman of the Joint Chiefs of Staff General Mark Milley U.S. Senators Dan Sullivan
							(R-Alaska), and four other senators sent a letter to Defense Secretary Lloyd Austin and Chairman of the
							Joint Chiefs of Staff General Mark Milley
						</Text>
					</div>
					<div className={style.logo}>
						<img src={logoPUN} alt=""/>
					</div>
				</Container>
			</section>
			<section className={style.contactCTA}>
				<Container>
					<Text id="about.contact_us_cta_text">U.S. Senators Dan Sullivan (R-Alaska), and four other senators sent a
						letter to Defense Secretary Lloyd Austin and Chairman of the Joint Chiefs of Staff General Mark Milley,
						asking them to immediately expedite shipments of military equipment to Ukraine as appropriated by Congress
						under the Additional Ukraine Supplemental Appropriations Act. Passed on May 19, Equipment recommended for
						immediate delivery includes medium- and long-range air defense systems, 155 mm howitzers.</Text>
					<button type="button"><Text id="about.contact_btn_title">Contact us</Text></button>
				</Container>
			</section>
			<section className={style.socials}>
				<Container>
					<h2><Text id="about.socials">“Protect Ukraine Now” Project</Text></h2>

				</Container>
			</section>
			<section className={style.donateCTA}>
				<Container>
					<h2><Text id="about.donate_cta_title">Help us help ukraine</Text></h2>
					<Text id="about.donate_description">
						This project is completely volunteer, so we will need finances to offer it, so support us so we can continue
						to help Ukraine!
					</Text>
					<button type="button"><Text id="about.donate_btn_title">Donate now</Text></button>
				</Container>
			</section>
		</div>
	);
};

export default About;
