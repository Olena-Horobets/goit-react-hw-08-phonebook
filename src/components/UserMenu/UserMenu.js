// import s from './UserMenu.module.css';

import { ReactComponent as ReactSprite } from 'images/sprite.svg';
import { useSelector } from 'react-redux';

import { useLogOutUserMutation } from 'store/auth/authAPI';
import { resetUser } from 'store/auth/auth-slice';
import { useDispatch } from 'react-redux';

function UserMenu() {
  const user = useSelector(state => state.auth.user);

  const [logOutUser] = useLogOutUserMutation();

  const dispatch = useDispatch();

  const handleLogOut = async e => {
    logOutUser();
    dispatch(resetUser());
  };

  return (
    <nav className="">
      <ReactSprite />

      {user?.name && <p>{`Hello, ${user.name}`}</p>}

      <button onClick={handleLogOut}>log out</button>
    </nav>
  );
}

export { UserMenu };
