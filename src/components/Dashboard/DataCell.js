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
		if (!sources || !sources.length) {
			return null;
		}

		return isSourcePopupShown ? (
			<div className={style.popup} ref={popupRef}>
				{sources.map(({ link, title }) => {
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
			<span className={style.count}>{value || '-'}</span>
			<div className={style.delta}>
				{!!delta && (
					<button
						className={style.value}
						onClick={handleDeltaClick}>
						<span className={style.plus}>+</span>
						<span className={style.delta}>{delta}</span>
					</button>
				)}
			</div>
			{sourcesPopup}
		</div>
	);
};

export default DataCell;
