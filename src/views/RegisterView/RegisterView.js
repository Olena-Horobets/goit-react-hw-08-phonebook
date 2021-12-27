import s from './RegisterView.module.css';
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import { useCreateUserMutation } from 'store/auth/authAPI';
import { setUser } from 'store/auth/auth-slice';
import { useDispatch } from 'react-redux';

import { Button } from 'components/Button/Button';

function RegisterView({ toast }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [signUpUser, { data, error }] = useCreateUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      toast(
        `Congratulations! You have registered as "${userName.toUpperCase()}"`,
      );
      dispatch(setUser(data));
      resetForm();
    } else if (error) {
      toast.error('Your request failed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const formComplited =
    userName.length && userEmail.length && userPassword.length >= 7;

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setUserName(value);
        break;
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

    const user = { name: userName, email: userEmail, password: userPassword };
    signUpUser({ user });
  };

  const resetForm = () => {
    setUserName('');
    setUserEmail('');
    setUserPassword('');
  };

  const getFormClass = () => {
    return userEmail.length
      ? 'formPlusPlus'
      : userName.length
      ? 'formPlus'
      : 'form';
  };

  return (
    <form onSubmit={handleSubmit} className={s[getFormClass()]}>
      <label htmlFor="name" className={s.label}>
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={userName}
          onChange={handleChange}
          className={s.input}
          autoComplete="off"
          autoFocus
          required
        />
      </label>
      {userName.length ? (
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
      ) : null}
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
        iconName="icon-person_add"
        iconClass="formBtnIcon"
        text="Sign up"
        disabled={!formComplited}
      />
    </form>
  );
}

RegisterView.propTypes = {
  toast: PropTypes.func,
};

export default RegisterView;
