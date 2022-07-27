import { useEffect, useMemo, useRef } from 'preact/hooks';
import useWindowSize from './useWindowSize';

export default (trigger, callback) => {
  const { width, height } = useWindowSize();
  const bodyRef = useRef(document.body);

  const style = useMemo(
    () => (bodyRef.current && width && height ? getComputedStyle(bodyRef.current) : null),
    [trigger, width, height],
  );

  useEffect(() => {
    if (style) {
      if (trigger) {
        document.body.style.overflow = 'hidden';
        if (typeof callback === 'function') {
          callback();
        }
      } else if (style.overflow !== 'auto') {
        document.body.style.overflow = 'auto';
      }
    }
  }, [trigger, style]);

  return;
};
