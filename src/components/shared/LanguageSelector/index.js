import { Link } from 'preact-router'
import Match from 'preact-router/match'
import cn from 'classnames';
import { LANGUAGES } from '../../../constants/shared';

import style from './style.scss';

const languages = new Set(LANGUAGES.map(({ label, value }) => value))

const Index = ({ className }) => (
  <Match>
    {({ url }) => (
      <ul className={cn(className, style.container)}>
        {LANGUAGES.map(({ label, value }) => {
          let a = url.split('/')
          let isActive = a[1] === value
          // We suppose the the URL form is /[lang]/<page>/[report_period]
          // At the moment...
          // TODO: revise and refactor: very bad
          a.splice(1, languages.has(a[1]) ? 1 : 0, value)
          let href = a.join('/')
          return (
            <Link
              key={value}
              className={cn(style.option, { [style.active]: isActive })}
              href={href}
            >
              {label}
            </Link>
          )
        }
        )}
      </ul>
    )}
  </Match>
);

export default Index;
