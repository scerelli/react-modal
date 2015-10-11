# React Modal [![Build Status](https://travis-ci.org/scerelli/react-modal.svg?branch=master)](https://travis-ci.org/scerelli/react-modal)

This component is a simple and easy to use modal made for react js.

### What is it?
ReactModal is a simple and essential modal component for react.

### Implementation example
```
var React = require('react');
var ReactModal = require('../../lib/components/ReactModal');

var Modal = React.createClass({
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
          Lorem Ipsum Doloret Sit Amet
        </ReactModal>
      </div>
    );
  }
});
```

### Props available

`[string]` `title`
It defines the title to show in the header of modal.

`[func]` `beforeOpen, beforeClose, afterOpen, afterClose`
These callbacks speak by themeselves: use them when you have to do something before/after opening/closing the modal.

`[number]` `animDuration`
it takes an integer and it defines the animation duration while opening and closing modal

`[bool]` `animModal`
it defines if a modal must be or not animated while opening/closing it.

`[string]` `closeIcon`
if defined, it overrides the default svg icon that is supposed to close the modal when clicked.

`[array]` `exitKeys`
an array of keyboard keys that when pressed close the modal. By default, only key `27` (`Esc`) is given to the listener. It's possible disable this feature by giving an empty array.
