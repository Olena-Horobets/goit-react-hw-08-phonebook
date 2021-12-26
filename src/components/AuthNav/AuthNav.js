import s from './AuthNav.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { NavLink } from 'react-router-dom';

function AuthNav() {
  return (
    <div className={s.authNav}>
      <ReactSprite />
      <NavLink
        to={{ pathname: '/register' }}
        className={props => (props.isActive ? s.activeLink : s.link)}
        end
      >
        Sign up
        <svg className={s.icon}>
          <use href="#icon-person_add"></use>
        </svg>
      </NavLink>
      <NavLink
        to={{ pathname: '/login' }}
        className={props => (props.isActive ? s.activeLink : s.link)}
        end
      >
        Log in
        <svg className={s.icon}>
          <use href="#icon-login"></use>
        </svg>
      </NavLink>
    </div>
  );
}

export { AuthNav };
