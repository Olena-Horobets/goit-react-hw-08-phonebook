import s from './Navigation.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className={s.nav}>
      <ReactSprite />
      <NavLink
        to={{ pathname: '/' }}
        className={props => (props.isActive ? s.activeLink : s.link)}
        end
      >
        <svg className={s.icon}>
          <use href="#icon-add-simple"></use>
        </svg>
      </NavLink>
      <NavLink
        to={{ pathname: '/deleted' }}
        className={props => (props.isActive ? s.activeLink : s.link)}
        end
      >
        <svg className={s.icon}>
          <use href="#icon-delete"></use>
        </svg>
      </NavLink>
    </nav>
  );
}

export { Navigation };
