import s from 'components/ContactItem/ContactItem.module.css';
import classNames from 'classnames';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDeleteContactMutation } from 'store/contacts/contsctsAPI';
// import { useAddBinContactMutation } from 'store/bin/binAPI';

import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

function ContactItem({ name, number, id }) {
  const [isHovered, setIsHovered] = useState(false);

  const [deleteContact, { data, isLoading }] = useDeleteContactMutation();
  // const [addToBin] = useAddBinContactMutation();

  useEffect(() => {
    if (!data) return;
    // addToBin({ contact: data });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
      {isLoading ? <Loader size={30} color={'rgba(1, 107, 110, 0.3)'} /> : null}
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
          onClick={() => deleteContact(id)}
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
