import cn from 'classnames';
import style from './style.scss';
import { useCallback, useMemo, useRef, useState } from 'preact/hooks';
import useClickOutside from '../../hooks/useClickOutside';

const DataCell = ({ className, value, delta, sources }) => {
	const [isSourcePopupShown, setIsSourcePopupShown] = useState(false);
	const popupRef = useRef();

	useClickOutside(popupRef, () => setIsSourcePopupShown(false));

	const handleDeltaClick = useCallback((e) => {
		e.stopPropagation();
		setIsSourcePopupShown(prev => !prev);
	}, []);


	const sourcesPopup = useMemo(() => {
		// if (!sources || !sources.length) {
		// 	return null;
		// }

		return isSourcePopupShown ? (
			<div className={style.popup} ref={popupRef}>
				{Object.entries(sources).map(([link, title]) => {
					return (
						<a className={style.source} href={link} key={link} target="_blank" title={link}>
							{title || link}
						</a>
					);
				})}
			</div>
		) : null;
	}, [sources, isSourcePopupShown]);

	return (
		<div className={cn(className, style.cell)}>
			<span className={style.count}>
				{value || '-'}
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
	);
};

export default DataCell;
