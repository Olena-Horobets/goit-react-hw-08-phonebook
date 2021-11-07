import s from 'components/ContactItem/ContactItem.module.css';

import { Component } from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';
import classNames from 'classnames';

class ContactItem extends Component {
  state = { isHovered: false };

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
    this.props.onBlock(this.props.id);
  };

  render() {
    const blockInputId = shortId.generate();
    return (
      <li
        className={s[this.props.isBlocked ? 'itemBlocked' : 'item']}
        onMouseOver={this.onContactHover}
        onMouseLeave={this.onContactHoverLeave}
      >
        <div className={s.itemInfo}>
          <span className={s.itemName}>
            <span className={s['iconName']}></span>
            {this.props.name}
          </span>
          <span className={s.itemNumber}>
            <span className={s['iconNumber']}></span>
            {this.props.number}
          </span>
        </div>

        <div className={s.itemControls}>
          <label
            className={
              s[this.props.isBlocked ? 'chbLabelBlocked' : 'chbLableNormal']
            }
            htmlFor={blockInputId}
          >
            {this.props.isBlocked ? 'unblock contact' : 'block contact'}
            <input
              id={blockInputId}
              className={s.blockContactCheckbox}
              type="checkbox"
              onChange={this.onBlockContactToggle}
              checked={this.props.isBlocked}
            />
            <span
              className={
                s[this.props.isBlocked ? 'chbIconBlocked' : 'chbIconNormal']
              }
            ></span>
          </label>

          <Button
            type="button"
            class={classNames('btn', 'deleteBtn', {
              emergedBtn: this.state.isHovered,
            })}
            iconClass={'deleteIcon'}
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
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool,
  onDelete: PropTypes.func,
  onBlock: PropTypes.func,
};

export { ContactItem };
