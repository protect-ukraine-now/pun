import { Link } from 'preact-router/match';

import style from './style.scss';
import Container from '../Container';
import LogoImage from '../../assets/icons/logo-horizontal-light.svg';
import LanguageSelector from '../LanguageSelector';
import Menu from '../Menu'
import Hamburger from '../Hamburger/Hamburger';
import { LANGUAGE_MENU } from '../../constants/language';
import { PAGES_MENU } from '../../constants/pages';

const Header = () => {
  return (
    <header className={style.header}>
      <Container className={style.container}>
        <Link className={style.logo}  href="/">
          <img src={LogoImage} alt="" />
        </Link>
        <Menu className={style.menu} theme="light" items={PAGES_MENU} />
        <LanguageSelector className={style.menu} theme="light" items={LANGUAGE_MENU} />
        <Hamburger className={style.hamburger} navigation={PAGES_MENU} languages={LANGUAGE_MENU} />
      </Container>
    </header>
  )
};

export default Header;
