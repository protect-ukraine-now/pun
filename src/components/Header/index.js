import { Fragment, h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.scss';
import Container from '../Container';
import LogoImage from '../../assets/icons/logo-horizontal.svg';
import LanguageSelector from '../LanguageSelector';
import Menu from '../Menu'
import useWindowSize from '../../hooks/useWindowSize';
import Hamburger from '../Hamburger/Hamburger';
import { LANGUAGE_MENU } from '../../constants/language';
import { PAGES_MENU } from '../../constants/pages';

const Header = () => {
  const { tablet, tabletMin, mobile } = useWindowSize();

  return (
    <header className={style.header}>
      <Container className={style.container}>
        <Link href="/">
          <img className={style.logo} src={LogoImage} alt="" />
        </Link>
        {tablet || tabletMin || mobile
          ? <Hamburger className={style.hamburger} navigation={PAGES_MENU} languages={LANGUAGE_MENU} />
          : (
            <Fragment>
              <Menu items={PAGES_MENU} />
              <LanguageSelector items={LANGUAGE_MENU} />
            </Fragment>
          )
        }
      </Container>
    </header>
  )
};

export default Header;
