import { useCallback, useEffect } from 'preact/hooks';

export default (ref, callback) => {
	const handleClickOutside = useCallback(
		(event) => {
			if (ref.current && !ref.current.contains(event.target) && callback) {
				callback(event);
			}
		},
		[ref, callback],
	);

	useEffect(() => {
		document?.addEventListener('mousedown', handleClickOutside, true);
		return () => {
			document?.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);
};
