import s from 'components/Header/Header.module.css';

function Header() {
  return (
    <header className={s.header}>
      <h1 className={s.title}>Phonebook</h1>
    </header>
  );
}

export { Header };
