import s from 'components/Header/Header.module.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

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
