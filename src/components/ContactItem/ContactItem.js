import s from 'components/ContactItem/ContactItem.module.css';
import classNames from 'classnames';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { useState, useEffect } from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';

import {
  useDeleteContactMutation,
  useBlockContactToggleMutation,
} from 'store/contacts/contsctsAPI';
import { useAddBinContactMutation } from 'store/bin/binAPI';

import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

function ContactItem({ name, number, id, isBlocked }) {
  const [isHovered, setIsHovered] = useState(false);

  const [deleteContact, { data, isLoading }] = useDeleteContactMutation();
  const [addToBin] = useAddBinContactMutation();
  const [blockContact, { isLoading: isBlocking }] =
    useBlockContactToggleMutation();

  const blockInputId = shortId.generate();

  useEffect(() => {
    if (!data) return;
    addToBin({ contact: data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const blockContactHandler = (id, isBlocked) => {
    blockContact({ id, contact: { isBlocked: !isBlocked } });
  };

  return (
    <div
      className={s[isBlocked ? 'itemBlocked' : 'item']}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {isLoading || isBlocking ? (
        <Loader size={30} color={'rgba(1, 107, 110, 0.3)'} />
      ) : null}
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
        <label
          className={s[isBlocked ? 'checkLabelBlocked' : 'checkLableNormal']}
          htmlFor={blockInputId}
        >
          {isBlocked ? 'unblock contact' : 'block contact'}
          <input
            id={blockInputId}
            className={s.blockContactCheckbox}
            type="checkbox"
            onChange={() => blockContactHandler(id, isBlocked)}
            checked={isBlocked}
          />
          <svg className={s.checkIcon}>
            <use href={`#${isBlocked ? 'icon-no_cell' : 'icon-cell'}`}></use>
          </svg>
        </label>

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
  isBlocked: PropTypes.bool.isRequired,
};

export { ContactItem };
