import s from './LogInView.module.css';

import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';
import classNames from 'classnames';

import { useLogInUserMutation } from 'store/auth/authAPI';
import { setUser } from 'store/auth/auth-slice';
import { useDispatch } from 'react-redux';

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
      console.log(error);
      toast.error('Your request failed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const formComplited = userEmail.length && userPassword.length;

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

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email: userEmail, password: userPassword };
    logInUser({ user });
  };

  const resetForm = () => {
    setUserEmail('');
    setUserPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label htmlFor="email" className={s.emerged}>
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={userEmail}
          onChange={handleChange}
          className={s.input}
          autoComplete="off"
          required
        />
      </label>
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

      <Button
        type="submit"
        styledClass={classNames('btn', 'formBtn')}
        iconName={'icon-add'}
        iconClass={'formBtnIcon'}
        text="Register"
        disabled={!formComplited}
      />
    </form>
  );
}

export { LogInView };
