var React = require('react');
var ReactModal = require('../../lib/components/ReactModal');

var App = React.createClass({
  showModal: function(){
    this.refs.modalExample.show();
  },

  beforeOpen: function() {
    console.log('beforeOpen')
  },

  beforeClose: function() {
    console.log('beforeClose')
  },

  afterOpen: function() {
    console.log('afterOpen')
  },

  afterClose: function() {
    console.log('afterClose')
  },

  render: function() {
    console.log('render');
    return (
      <div className="example">
        <a onClick={this.showModal}>Click To Show Modal</a>

        <ReactModal ref="modalExample"
                    title="Test title modale"
                    beforeOpen={this.beforeOpen}
                    beforeClose={this.beforeClose}
                    afterOpen={this.afterOpen}
                    afterClose={this.afterClose}>
          dwucwu9duhg3vu893rv893rv89hrvh9u8
        </ReactModal>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('container'));
