import cn from 'classnames';
import style from './style.scss';

const DataCell = ({ className, value, delta, sources }) => {
  const sourcesPopup = (() => {
    if (!sources || !sources.lenth) {
      return null;
    }

    return (
      <div className={style.popup}>
        {sources.map((source) => (
          <a className={style.source} href={source} key={source}>
            {source}
          </a>
        ))}
      </div>
    );
  })();

  return (
    <div className={cn(className, style.cell)}>
      <span className={style.count}>{value}</span>
      {<span className={style.delta}>{delta ? `+${delta}` : ''}</span>}
      {sourcesPopup}
    </div>
  );
};

export default DataCell;
