import Link from 'next/link';
import s from './styles.module.css';

const Header = () => {
  return (
    <div className={s.box}>
      <h1 className={s.logo}>Logo</h1>
      <ul className={s.list}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <Link href="./login">
        <button className={s.btn}>Войти</button>
      </Link>
    </div>
  );
};

export default Header;
