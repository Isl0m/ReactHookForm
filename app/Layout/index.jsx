import Header from '../components/Header';

import s from './styles.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={s.main}>{children}</div>
    </>
  );
};

export default Layout;
