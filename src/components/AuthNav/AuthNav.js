import s from './AuthNav.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { NavLink } from 'react-router-dom';

function AuthNav() {
  return (
    <nav className="">
      <ReactSprite />
      <NavLink
        to={{ pathname: '/register' }}
        className={props => (props.isActive ? s.activeLink : s.link)}
        end
      >
        Sign up
      </NavLink>
      <NavLink
        to={{ pathname: '/login' }}
        className={props => (props.isActive ? s.activeLink : s.link)}
        end
      >
        Log in
      </NavLink>
    </nav>
  );
}

export { AuthNav };
