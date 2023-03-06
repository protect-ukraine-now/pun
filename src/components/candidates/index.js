import { useState, useEffect } from 'preact/hooks';
import cn from 'classnames';
import ky from 'ky';

import style from './style.scss';
import Container from '../Container';
import IconLink from '../IconLink';
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
			<section className={cn(style.section, style.explanation)}>
				<p>
                    Without western support Ukraine resistance will crumble.
                    It is essential for world peace and US security that Ukraine emerges victorious from this war.
				</p>
				<h2>Please send an inquiry to your candidate about his/her public position toward supporting the Ukrainian struggle</h2>
				<p>
                    Enter your address, find your candidates and send your inquiry.
                    You can use our sample, modify it or write your own.
				</p>
			</section>
			<div className={style.form}>
                <textarea className={style.letter} rows="10">
                    US support of Ukrainian struggle is one of the key political issues for me and I would like to know your position toward providing military support to Ukraine as well as sending humanitarian and government aid. Before I cast my vote for you I hope you can express your position publicly. Where do you stand on this issue?
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
				{candidates?.length > 0 &&
					candidates.map(c => (
						<div key={c.name} className={style.candidateCard}>
							<div className={style.left}>
								<img className={style.photo} src={c.photo} alt=""/>
							</div>
							<div className={style.right}>
								<div className={style.name}>{c.name}</div>
								<div className={style.party}>
                                    {c.race.replace('Rep', 'Representative')} | {c.party}
                                </div>
								<div className={style.links}>
									{c.links.map(href => <IconLink className={style.icon} {...{ href }} />)}
								</div>
							</div>
						</div>
					))
                }
                {candidates?.length === 0 &&
                    <div>
						We were not able to find any candidates for you.
						Please, check your voting address or try
                        {' '}
                        <a
                            // className={style.link}
                            href="https://ivoterguide.com/my-ballot"
                            target="_blank"
                        >
                            this site
                        </a>
					</div>
				}
			</div>
		</Container>
	);
}
