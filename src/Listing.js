import React, {Component} from 'react';

export default class Listing extends Component {
  updateInput = (lineNumber) => {
    return (inputValue) => {
      this.props.updateLine(lineNumber, inputValue)
    }
  };
  render() {
    const elements = [1,2,3,4,5,6,7];
    const items = [];
  
      for (const [index, value] of elements.entries()){
        items.push(
            <li key={index}>{value}.
              <input 
                onChange= {this.updateInput(value)}
                value= {this.props.lineState[value]}
                className = "input-field">
              </input>
            </li>
        )}
  return (
    <div>
      {items}
    </div>
    );
  }
}
