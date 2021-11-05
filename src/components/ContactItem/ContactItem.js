import s from 'components/ContactItem/ContactItem.module.css';

import { Component } from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';
import classNames from 'classnames';

const blockInputId = shortId.generate();

class ContactItem extends Component {
  state = { isHovered: false, isBlocked: false };

  onContactHover = e => {
    this.setState({ isHovered: true });
  };

  onContactHoverLeave = e => {
    this.setState({ isHovered: false });
  };

  onDeleteContact = e => {
    this.props.onDelete(this.props.id);
  };

  onBlockContactToggle = e => {
    this.setState(({ isBlocked }) => {
      return { isBlocked: !isBlocked };
    });
  };

  render() {
    return (
      <li
        className={s.item}
        onMouseOver={this.onContactHover}
        onMouseLeave={this.onContactHoverLeave}
      >
        <div className={s.itemInfo}>
          <span className={s.itemName}>
            <span className={classNames('icon', s['iconName'])}></span>
            {this.props.name}
          </span>
          <span className={s.itemNumber}>
            <span className={classNames('icon', s['iconNumber'])}></span>
            {this.props.number}
          </span>
        </div>
        <div className={s.itemControls}>
          <label className={s.blockContactLable} htmlFor={blockInputId}>
            block contact
            <input
              id={blockInputId}
              className={s.blockContactCheckbox}
              type="checkbox"
              onChange={this.onBlockContactToggle}
              checked={this.state.isBlocked}
            />
          </label>

          <Button
            type="button"
            class={classNames('btn', 'deleteBtn', {
              emergedBtn: this.state.isHovered,
            })}
            text="DELETE"
            onClick={this.onDeleteContact}
            contactId={this.props.id}
            disabled={false}
          />
        </div>
      </li>
    );
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export { ContactItem };
