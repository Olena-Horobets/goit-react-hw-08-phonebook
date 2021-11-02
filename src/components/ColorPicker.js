import { Component } from 'react';
import 'components/ColorPicker.css';

class ColorPicker extends Component {
  state = {
    activeOptionIdx: 0,
  };

  setActiveIdx = idx => {
    this.setState({ activeOptionIdx: idx });
  };

  makeOptionClassName = idx => {
    const optionClasses = ['option'];
    if (idx === this.state.activeOptionIdx) {
      optionClasses.push('option-active');
    }
    return optionClasses.join(' ');
  };

  render() {
    const color = this.props.options[this.state.activeOptionIdx].lable;

    return (
      <div>
        <p>ACTIVE COLOR: {color} </p>

        <div>
          {this.props.options.map(({ lable, hex }, idx) => {
            return (
              <button
                key={lable}
                className={this.makeOptionClassName(idx)}
                style={{ backgroundColor: hex }}
                onClick={() => this.setActiveIdx(idx)}
              ></button>
            );
          })}
        </div>
      </div>
    );
  }
}

export { ColorPicker };
