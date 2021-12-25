import s from 'components/Header/Header.module.css';

import { useSelector } from 'react-redux';

import { AuthNav } from 'components/AuthNav/AuthNav';
import { UserMenu } from 'components/UserMenu/UserMenu';

function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <header className={s.header}>
      <h1 className={s.title}>Phonebook</h1>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}

export { Header };
