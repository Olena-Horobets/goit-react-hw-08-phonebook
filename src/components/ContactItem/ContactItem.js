import s from 'components/ContactItem/ContactItem.module.css';

import { useState } from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';
import {
  useDeleteContactMutation,
  useBlockContactToggleMutation,
} from 'store/contsctsAPI';

import classNames from 'classnames';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

function ContactItem({ name, number, id, isBlocked }) {
  const [isHovered, setIsHovered] = useState(false);

  const [deleteContact] = useDeleteContactMutation();
  const [blockContact] = useBlockContactToggleMutation();

  const blockInputId = shortId.generate();

  const blockContactHandler = (id, isBlocked) => {
    blockContact({ id, contact: { isBlocked: !isBlocked } });
  };

  return (
    <li
      className={s[isBlocked ? 'itemBlocked' : 'item']}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
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
          text="DELETE"
          onClick={() => deleteContact(id)}
          disabled={false}
        />
      </div>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool.isRequired,
};

export { ContactItem };
