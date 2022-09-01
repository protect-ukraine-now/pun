import { useState, useMemo } from 'preact/hooks';
import { Link } from 'preact-router';
import { Text } from 'preact-i18n';
import cn from 'classnames';
import US from 'country-flag-icons/react/1x1/US'
import PL from 'country-flag-icons/react/1x1/PL'
import CA from 'country-flag-icons/react/1x1/CA'
import GB from 'country-flag-icons/react/1x1/GB'
import { IoEllipsisHorizontalCircle } from 'react-icons/io5'

import style from './style.scss';
import { latestReport, prepareReport, Report } from '../../data/report';
import { formatDate } from '../../tools/date';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';

const Dashboard = ({ language }) => {
	const [report, setReport] = useState(latestReport);
	// console.log('Dashboard', report);
	let data = useMemo(() => prepareReport(report), [report]);
	let { from, till, prev, next } = report;
	const formatter = formatDate(language);
	from = formatter(from);
	till = formatter(till);

	const left = data.slice(0, data.length / 2);
	const right = data.slice(-data.length / 2);

	const headLayout = (
		<div className={cn(style.row, style.headRow)}>
			<div className={style.head}/>
			{/*<div className={style.head}/>*/}
			<div className={style.head} title="US">
				<US className={style.countryFlag} />
				{/*<Text id="report.usa">USA</Text>*/}
			</div>
			<div className={style.head} title="Other Countries">
				<CA className={style.countryFlag} />
				<GB className={style.countryFlag} />
				<PL className={style.countryFlag} />
				<IoEllipsisHorizontalCircle className={style.ellipsis} />
				{/*<Text id="report.rest">Others</Text>*/}
			</div>
		</div>
	);

	const rowsRenderer = ({ category, values: [usa, rest] }) => (
		<div className={style.row}>
			<IconCell category={category}/>
			{/*<div className={style.category}>*/}
			{/*	<Text id={`weapon_category.${category}`}>{category}</Text>*/}
			{/*</div>*/}
			<DataCell className={style.valueCell} {...usa} key={`${category}-USA`}/>
			<DataCell className={style.valueCell} {...rest} key={`${category}-rest`}/>
		</div>
	);

	const renderTableLayout = tableData => (
		<div className={style.table}>
			{headLayout}
			{tableData.map(rowsRenderer)}
		</div>
	);

	return (
		<Container>
			<h1 className={style.heading}>
				<Text id="report.title" fields={{ from, till }}>
					Weapons committed to Ukraine
				</Text>
				<div className={style.subHeading}>
					<div className={style.subtitle}>
						<Text id="report.subtitle" fields={{ from, till }}>
							as of {till}
						</Text>
					</div>
					<div className={style.nav}>
						<Link
							className={style.navLink}
							{...prev && {
								href: `#`,
								onClick: () => setReport(Report(prev))
							}}
						>
							{'← '}
						</Link>
						<span className={style.period}>
							<Text id="report.timespan">2 weeks</Text>
						</span>
						<Link
							className={style.navLink}
							{...next && {
								href: `#`,
								onClick: () => setReport(Report(next))
							}}
						>
							{' →'}
						</Link>
					</div>
				</div>
			</h1>
			<div className={style.splitter}>
				{[left, right].map(renderTableLayout)}
			</div>
			<p className={style.description}><Text id="report.description"/></p>
		</Container>


	);
};

export default Dashboard;
