import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.scss';
import Container from '../Container';
import LogoImage from '../../assets/logo.svg';
import LanguageSelector from '../LanguageSelector';
import Menu from '../Menu'

const Header = () => (
  <header className={style.header}>
    <Container className={style.container}>
      <Link href="/">
        <img className={style.logo} src={LogoImage} alt="" />
      </Link>
      <Menu />
      <LanguageSelector />
    </Container>
  </header>
);

export default Header;
