import style from './style.scss';

const DataCell = ({ value, delta, sources }) => {
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
    <div className={style.cell}>
      <span className={style.count}>{value}</span>
      {!!delta && <span className={style.delta}>+{delta}</span>}
      {sourcesPopup}
    </div>
  );
};

export default DataCell;
