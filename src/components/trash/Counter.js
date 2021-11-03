import React, { Component } from 'react';

class Counter extends Component {
  static defaultProps = {
    step: 6,
  };

  state = {
    value: 0,
  };

  handleIncrement = () => {
    this.setState(prevState => {
      return { value: (prevState.value += this.props.step) };
    });
  };

  handleDecrement = () => {
    this.setState(prevState => {
      return { value: (prevState.value -= this.props.step) };
    });
  };

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>{this.state.value}</span>
        <button type="button" onClick={this.handleIncrement}>
          Increment by {step}
        </button>
        <button type="button" onClick={this.handleDecrement}>
          Decrement by {step}
        </button>
      </div>
    );
  }
}

export { Counter };
