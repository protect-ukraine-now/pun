import { Fragment, h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.scss';
import Container from '../Container';
import LogoImage from '../../assets/icons/logo-horizontal.svg';
import LanguageSelector from '../LanguageSelector';
import Menu from '../Menu'
import useWindowSize from '../../hooks/useWindowSize';
import Hamburger from '../Hamburger/Hamburger';
import { LANGUAGES } from '../../constants/language';

let pages = language => [
  ['REPORT', `/${language}/report`],
  ['LETTER', `/${language}/letter`]
];

const languages = url => language => LANGUAGES.map(({ label, value}) => {
  let a = url.split('/')
  a[1] = value
  let href = a.join('/')

  return [label, href];
});

const Header = () => {
  const { mobile } = useWindowSize();

  return (
    <header className={style.header}>
      <Container className={style.container}>
        <Link href="/">
          <img className={style.logo} src={LogoImage} alt="" />
        </Link>
        {mobile
          ? <Hamburger className={style.hamburger} navigaition={pages} languages={languages} />
          : (
            <Fragment>
              <Menu items={pages} />
              <LanguageSelector items={languages} />
            </Fragment>
          )
        }
      </Container>
    </header>
  )
};

export default Header;
