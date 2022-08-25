import style from './style.scss';
import Container from '../../components/Container';
import Dashboard from '../../components/Dashboard';
import AidChart from '../../components/AidChart';
import Banner from '../../components/Banner';
import { Link } from 'preact-router';
import { Text } from 'preact-i18n';
import { useLanguage } from '../../tools/language';
import reportBannerImage from '../../assets/images/banner-bg-1.png';

export default function Report(props) {
	// console.log('Report props', props)
	const language = useLanguage();
	return (
		<>
			<Container className={style.container}>
				<Dashboard {...props} />
			</Container>
			<Banner
				className={style.banner}
				title={<Text id="report.banner_title">Do You think Ukraine needs more weapon?</Text>}
				image={reportBannerImage}
				action={
					<Link className={style.bannerBtn} path={`/${language}/letter`}>
						<Text id="report.banner_btn">Help us, sign petition</Text>
					</Link>
				}
			/>
			<Container className={style.chart}>
				<AidChart {...props} />
			</Container>
		</>
	);
}
