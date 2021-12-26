import s from './UserMenu.module.css';

import { ReactComponent as ReactSprite } from 'images/sprite.svg';
import { useSelector } from 'react-redux';

import { useLogOutUserMutation } from 'store/auth/authAPI';
import { resetUser } from 'store/auth/auth-slice';
import { useDispatch } from 'react-redux';

import { Button } from 'components/Button/Button';

function UserMenu() {
  const user = useSelector(state => state.auth.user);

  const [logOutUser] = useLogOutUserMutation();

  const dispatch = useDispatch();

  const handleLogOut = async e => {
    logOutUser();
    dispatch(resetUser());
  };

  return (
    <div className={s.userMenu}>
      <ReactSprite />

      {user?.name && (
        <p className={s.text}>{`Nice to see you, ${user.name}!`}</p>
      )}
      <svg className={s.icon}>
        <use href="#icon-account_circle"></use>
      </svg>

      <Button
        type="button"
        styledClass="authBtn"
        iconName="icon-logout"
        iconClass="formBtnIcon"
        text="Log out"
        onClick={handleLogOut}
      />
    </div>
  );
}

export { UserMenu };
