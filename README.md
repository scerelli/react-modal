# React Modal [![Build Status](https://travis-ci.org/scerelli/react-modal.svg?branch=master)](https://travis-ci.org/scerelli/react-modal)

This component is a simple and easy to use modal made for react js.

### What does it have? 

- it support fade animation while open and closing modal
- it support esc key to close the mode
- it support click on overlay to close the modal
- is css free, you just have to include the component and it simplt works
- is easy to implement.


### Implementation example


```
var React = require('react');
var ReactModal = require('../../lib/components/ReactModal');

var App = React.createClass({
  showModal: function(){
    this.refs.modal.show();
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
        <ReactModal ref="modal"
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
```title```
it accept string and defines the title to show in the header of modal.

```beforeOpen, beforeClose, afterOpen, afterClose```

these callbacks speak by themeselves, when you have to do something before/after opening/closing the modal use these callbacks.

```animDuration```
it takes an integer and it defines the animation duration while opening and closing modal

```animModal``
it defines if a modal must be or not animated while opening/closing it.
