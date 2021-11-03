import { Component } from 'react';
import PropTypes from 'prop-types';

class ContactItem extends Component {
  state = {};

  render() {
    return (
      <li>
        {this.props.name} - {this.props.number}
      </li>
    );
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export { ContactItem };
