import { useRef, useState } from 'react'
import cn from 'clsx'

import style from './style.module.scss'
import useClickOutside from 'src/tools/useClickOutside'

const DataCell = ({ className, value, delta, sources }) => {
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
				{Object.entries(sources).map(([link, title]) => {
					return (
						<a
							className={style.source}
							href={link}
							key={link}
							target="_blank"
							title={link}
							rel="noreferrer"
						>
							{title || link}
						</a>
					)
				})}
			</div>
		) : null
	)

	let emptyValue = <span className={style.emptyValue}>0</span >

	return (
		<div className={cn(className, style.cell)}>
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
