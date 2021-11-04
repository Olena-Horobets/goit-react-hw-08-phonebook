import s from 'components/ContactItem/ContactItem.module.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';

class ContactItem extends Component {
  onDeleteContact = e => {
    this.props.onDelete(this.props.id);
  };

  render() {
    return (
      <li className={s.item}>
        <span className={s.itemName}>{this.props.name}</span>{' '}
        <span className={s.itemNumber}>{this.props.number}</span>
        <div className={s.itemControls}>
          <Button
            type="button"
            class="deleteBtn"
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
