import s from 'views/RegisterView/RegisterView.module.css';
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import { useLogInUserMutation } from 'store/auth/authAPI';
import { setUser } from 'store/auth/auth-slice';
import { useDispatch } from 'react-redux';

import { Button } from 'components/Button/Button';

function LogInView({ toast }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [logInUser, { data, error }] = useLogInUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      toast(`Congratulations! You have logged in`);
      dispatch(setUser(data));
      resetForm();
    } else if (error) {
      toast.error('Your request failed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const formComplited = userEmail.length && userPassword.length >= 7;

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'email':
        setUserEmail(value);
        break;
      case 'password':
        setUserPassword(value);
        break;
      default:
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const user = { email: userEmail, password: userPassword };
    logInUser({ user });
  };

  const resetForm = () => {
    setUserEmail('');
    setUserPassword('');
  };

  const getFormClass = () => {
    return userEmail.length ? 'formPlus' : 'form';
  };

  return (
    <form onSubmit={handleSubmit} className={s[getFormClass()]}>
      <label htmlFor="email" className={s.label}>
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={userEmail}
          onChange={handleChange}
          className={s.input}
          autoComplete="off"
          autoFocus
          required
        />
      </label>
      {userEmail.length ? (
        <label htmlFor="password" className={s.emerged}>
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={userPassword}
            onChange={handleChange}
            className={s.input}
            autoComplete="off"
            required
          />
        </label>
      ) : null}

      <Button
        type="submit"
        styledClass="formBtn"
        iconName="icon-login"
        iconClass="formBtnIcon"
        text="Log in"
        disabled={!formComplited}
      />
    </form>
  );
}

LogInView.propTypes = {
  toast: PropTypes.func,
};

export default LogInView;
