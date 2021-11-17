import s from 'components/EmptyMessage/EmptyMessage.module.css';

import PropTypes from 'prop-types';

function EmptyMessage({ message }) {
  return <p className={s.message}>{message}</p>;
}

EmptyMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export { EmptyMessage };
