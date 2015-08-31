var React = require('react');
var ReactModal = require('../../lib/components/ReactModal');

var App = React.createClass({
  showModal: function(){
    this.refs.modalExample.show();
  },

  render: function() {
    console.log('render');
    return (
      <div className="example">
        <a onClick={this.showModal}>Click To Show Modal</a>

        <ReactModal ref="modalExample">
          dwucwu9duhg3vu893rv893rv89hrvh9u8
        </ReactModal>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('container'));
