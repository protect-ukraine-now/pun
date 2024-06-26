import { useRef, useState } from 'preact/hooks'
import cn from 'clsx'

import style from './style.module.scss'
import useClickOutside from '@tools/useClickOutside'
import countries from '@data/countries.json'

const DataCell = ({ className, value, delta, sources, ...rest }) => {
	const [isSourcePopupShown, setIsSourcePopupShown] = useState(false)
	const popupRef = useRef()
	useClickOutside(popupRef, () => setIsSourcePopupShown(false))

	const handleDeltaClick = (e) => {
		e.stopPropagation()
		setIsSourcePopupShown(prev => !prev)
	}

	const sourcesPopup = (
		isSourcePopupShown ? (
			<div className={style.popup} ref={popupRef}>
				{sources.map(({ country, model, qty, link }, i) => {
					return (
						<a
							className={style.source}
							href={link}
							title={countries[country]}
							key={i}
							target="_blank"
							rel="noreferrer"
						>
							<span className={`i-circle-flags-${country} text-xl align-text-bottom`}/>
							{' '}<b className="font-bold">+{qty}</b> {model}
						</a>
					)
				})}
			</div>
		) : null
	)

	let emptyValue = <span className={style.emptyValue}>0</span >

	return (
		<div className={cn(className, style.cell)} {...rest}>
			<span className={style.count}>
				{value || emptyValue}
				{!!delta && (
					<button
						className={style.deltaValue}
						onClick={handleDeltaClick}>
						<span className={style.plus}>+</span>
						<span className={style.value}>{delta}</span>
					</button>
				)}
			</span>
			{sourcesPopup}
		</div>
	)
}

export default DataCell
