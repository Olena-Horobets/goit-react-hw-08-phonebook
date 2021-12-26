import s from 'components/ContactItem/ContactItem.module.css';
import classNames from 'classnames';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useDeleteContactMutation } from 'store/contacts/contsctsAPI';
import { moveToBin } from 'store/bin/actions-bin';

import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

function ContactItem({ name, number, id }) {
  const [isHovered, setIsHovered] = useState(false);

  const [deleteContact, res] = useDeleteContactMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!data) return;
    // console.log(data);
    // console.log(res);
    // console.log(name, number, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const deleteHandling = () => {
    deleteContact(id);
    dispatch(moveToBin({ name, number, id }));
  };

  return (
    <div
      className={s['item']}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* {isLoading ? <Loader size={30} color={'rgba(1, 107, 110, 0.3)'} /> : null} */}
      <ReactSprite />
      <div className={s.itemInfo}>
        <span className={s.itemName}>
          <svg className={s.itemIcon}>
            <use href={'#icon-face'}></use>
          </svg>
          {name}
        </span>
        <span className={s.itemNumber}>
          <svg className={s.itemIcon}>
            <use href={'#icon-call'}></use>
          </svg>
          {number}
        </span>
      </div>

      <div className={s.itemControls}>
        <Button
          type="button"
          styledClass={classNames('btn', 'deleteBtn', {
            emergedBtn: isHovered,
          })}
          iconClass={'deleteIcon'}
          iconName={'icon-delete'}
          text="Move to trash"
          onClick={() => deleteHandling({ id, name, number })}
          disabled={false}
        />
      </div>
    </div>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export { ContactItem };
