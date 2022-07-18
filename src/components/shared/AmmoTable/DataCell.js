import cn from 'classnames';
import style from './style.scss';

const DataCell = ({ className, value, delta, sources }) => {
  const sourcesPopup = (() => {
    if (!sources || !sources.lenth) {
      return null;
    }

    console.log('sources', sources)

    return (
      <div className={style.popup}>
        {sources.map(({ link, title }) => (
          <a className={style.source} href={link} key={link}>
            {title || link}
          </a>
        ))}
      </div>
    );
  })();

  return (
    <div className={cn(className, style.cell)}>
      <span className={style.count}>{value || '-'}</span>
      {<span className={style.delta}>{delta ? `+${delta}` : ''}</span>}
      {sourcesPopup}
    </div>
  );
};

export default DataCell;
