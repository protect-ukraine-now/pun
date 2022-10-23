import { useState, useEffect } from 'preact/hooks';
import cn from 'classnames';
import ky from 'ky';

import style from './style.scss';
import Container from '../../components/Container';
import IconLink from '../../components/IconLink';
import copyToClipboard from '../../tools/copyToClipboard';

const base = 'https://ochre-hermit-crab-veil.cyclic.app';

export default function Letter() {
	let [street, setStreet] = useState('');
	let [city, setCity] = useState('');
	let [zip, setZip] = useState('');
	let [candidates, setCandidates] = useState();
	useEffect(() => {
		let address = `${street}, ${city}, ${zip}`;
		if (address.length < 22) return;
		let controller = new AbortController();
		let { signal } = controller;
		ky(`${base}/candidates?address=${global.encodeURIComponent(address)}`, {
			signal
		})
			.json()
			.then(setCandidates)
			.catch(console.error);
		return () => controller.abort();
	}, [street, city, zip]);
	return (
		<Container className={style.container}>
			<section className={cn(style.section, style.banner)}>
				<h1 className={style.title}>
					US must arm Ukraine now
					<br/><span className={style.mobile}>&nbsp;</span>
					before it’s too late
				</h1>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<p>
					Russia launched the most unprecedented missile attack across the entire Ukraine targeting critical
					infrastructure and slaughtering civilians. More than 3600 missiles have been launched on Ukrainian territory.
					By October, tens of thousands of civilians had been killed, including more than 400 children.
				</p>
				<p>
					As of now not a single air defense system was provided by the US. There is no excuse for this cowardly and
					heartless position of the White House. Empty pledges and condemnations have not saved a single killed child.
				</p>
				<p>
					Significantly MORE MILITARY AID is needed urgently. Time to act is NOW before more children are killed.
				</p>
			</section>
			<div className={style.form}>
            <textarea className={style.letter} rows="10">
                Russia launched the most unprecedented missile attack across the entire Ukraine targeting critical infrastructure and slaughtering civilians. More than 3600 missiles have been launched on Ukrainian territory. By October, tens of thousands of civilians had been killed, including more than 400 children.
							{'\n\n'}
							As of now not a single air defense system was provided by the US. There is no excuse for this cowardly and heartless position of the White House. Empty pledges and condemnations have not saved a single killed child.
							{'\n\n'}
							Significantly MORE MILITARY AID is needed urgently. Time to act is NOW before more children are killed.
            </textarea>

				<button onClick={() => copyToClipboard(`.${style.letter}`)}>Copy to Clipboard</button>
				<input
					type="text"
					placeholder="Voting address"
					autoComplete="street-address"
					value={street}
					onChange={e => setStreet(e.target.value)}
				/>
				<input
					type="text"
					placeholder="City"
					autoComplete="address-level2"
					value={city}
					onChange={e => setCity(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Zip code"
					autoComplete="postal-code"
					value={zip}
					onChange={e => setZip(e.target.value)}
				/>
			</div>
			<div className={style.candidatesList}>
				{candidates && candidates.length !== 0 ?
					candidates.map(c => (
						<div key={c.name} className={style.candidateCard}>
							<div className={style.left}>
								<img className={style.photo} src={c.photo} alt=""/>
							</div>
							<div className={style.right}>
								<div className={style.name}>{c.name}</div>
								<div className={style.party}>{c.race} | {c.party}</div>
								<div className={style.links}>
									{c.links.map(href => <IconLink className={style.icon} {...{ href }} />)}
								</div>
							</div>
						</div>
					)) : <div>
						We were not able to find any candidates for you.
						Please, check your voting address or try <a className={style.link} href="https://ivoterguide.com/my-ballot"
																												target="_blank">this site</a>
					</div>
				}
			</div>
		</Container>
	);
}
