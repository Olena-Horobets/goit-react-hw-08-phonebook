import { Component } from 'react';

class Dropdown extends Component {
  state = {
    isVisible: false,
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible,
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleMenu}>
          {this.state.isVisible ? 'Hide' : 'Show'}
        </button>
        {this.state.isVisible && <div>MENU</div>}
      </div>
    );
  }
}

export { Dropdown };
