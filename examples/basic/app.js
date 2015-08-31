import React from 'react';
import ReactModal from '../../lib/index';

let App = React.createClass({
  render() {
    return (
      <div className="example">
        <h1>react-modal</h1>
        <ReactModal/>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('container'));
