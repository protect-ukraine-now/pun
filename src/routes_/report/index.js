import cn from 'classnames';
import style from './style.scss';
import Container from '../../components/Container';
import Dashboard from '../../components/Dashboard';
import AidChart from '../../components/AidChart';
import Banner from '../../components/Banner';
import { Link } from 'preact-router';
import { Text } from 'preact-i18n';
import { useLanguage } from '../../tools/language';
// import reportBannerImage from '../../assets/images/banner-bg-1.webp';
import detectCountry from '../../tools/detectCountry';

export default function Report(props) {
	// console.log('Report props', props)
	const language = useLanguage();
	const country = detectCountry();

	return (
		<>
			<Container className={style.container}>
				<Dashboard {...props} />
			</Container>
			<Banner
				className={cn(style.banner, {[style.visible]: country === 'US'})}
				title={<Text id="report.banner_title">Protect Ukraine now before it's too late!</Text>}
				image="../../assets/images/banner-bg-1.webp"
				action={
					<Link className={style.bannerBtn} href={`/${language}/letter`}>
						<Text id="report.banner_btn">Click here</Text>
					</Link>
				}
			/>
			<Container className={style.chart}>
				<AidChart {...props} />
			</Container>
		</>
	);
}
