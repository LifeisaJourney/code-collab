import React, {Component} from 'react';

export default class Listing extends Component {
  render() {
    const elements = [1,2,3,4,5,6,7];
    const items = [];
  
      for (const [index, value] of elements.entries()) {
        items.push(<li key={index}>{value}</li>)
        }
    
  return (
    <div>
      {items}
    </div>
    );
  }
}
