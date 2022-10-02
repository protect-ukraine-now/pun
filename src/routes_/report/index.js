import style from './style.scss';
import Container from '../../components/Container';
import WeaponsBalance from '../../components/WeaponsBalance';
import WeaponsCommits from '../../components/WeaponsCommits';
import AidChart from '../../components/AidChart';
import Banner from '../../components/Banner';
import { Link } from 'preact-router';
import { Text } from 'preact-i18n';
import { useLanguage } from '../../tools/language';
import reportBannerImage from '../../assets/images/banner-bg-1.webp';
import detectCountry from '../../tools/detectCountry';

export default function Report(props) {
	// console.log('Report props', props)
	const language = useLanguage();
	const country = global.window && detectCountry();

	return (
		<>
			<Container className={style.container}>
				<WeaponsBalance {...props} />
				<WeaponsCommits {...props} />
			</Container>
			{country === 'US' &&
				<Banner
					className={style.banner}
					title={<Text id="report.banner_title">Protect Ukraine now before it's too late!</Text>}
					image={reportBannerImage}
					action={
						<Link className={style.bannerBtn} href={`/${language}/letter`}>
							<Text id="report.banner_btn">Click here</Text>
						</Link>
					}
				/>
			}
			<Container className={style.chart}>
				<AidChart {...props} />
			</Container>
		</>
	);
}
