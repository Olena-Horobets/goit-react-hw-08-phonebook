import s from 'components/Header/Header.module.css';

import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className={s.header}>
        <h1 className={s.title}>Phonebook</h1>
      </header>
    );
  }
}

export { Header };
