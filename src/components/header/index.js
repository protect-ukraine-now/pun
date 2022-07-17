import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.scss';
import Container from '../shared/Container';
import LogoImage from '../../assets/logo.svg';
import LanguageSelector from '../shared/LanguageSelector';

const Header = ({ language, onLanguageSelect }) => (
  <header className={style.header}>
    <Container className={style.container}>
      <Link href="/">
        <img className={style.logo} src={LogoImage} alt="" />
      </Link>
      <LanguageSelector value={language} onChange={onLanguageSelect} />
    </Container>
  </header>
);

export default Header;
