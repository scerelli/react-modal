'use strict';

var React = require('react');
var _ = require('underscore');

//Modal Style
var style = require('./style');

var ReactModal = React.createClass({
  displayName: 'ReactModal',

  propTypes: {
    title: React.PropTypes.string,
    modalPrefix: React.PropTypes.string,
    beforeOpen: React.PropTypes.func,
    beforeClose: React.PropTypes.func,
    afterOpen: React.PropTypes.func,
    afterClose: React.PropTypes.func,
    loadStyle: React.PropTypes.bool,
    //stylishProps
    overlayOpacity: React.PropTypes.string, //overlay
    topZindex: React.PropTypes.string, //modal
    animateModal: React.PropTypes.bool, //modal
    animationType: React.PropTypes.bool //modal
  },

  getDefaultProps: function getDefaultProps() {
    return {
      title: '',
      loadStyle: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      isVisible: false
    };
  },

  show: function show() {
    this.setState({ isVisible: true });
  },

  hide: function hide() {
    this.setState({ isVisible: false });
  },

  render: function render() {
    var animation;
    var animationType;
    var title;

    title = this.props.title ? React.createElement(
      'h2',
      { className: 'react-modal__wrapper__header__title' },
      this.props.title
    ) : '';

    if (this.state.isVisible) {
      style.modal.display = 'block';
    } else if (!this.state.isVisible) {
      style.modal.display = 'none';
    }

    if (this.props.animateModal) {
      switch (this.props.animationType) {
        case 'fade':
          animationType = style.fade;
          break;
        default:
          animationType = style.fade;
          break;
      }
      animation = _extend(style.animate, animationType);
    }

    return React.createElement(
      'div',
      { className: 'react-modal', style: (animation, style.modal) },
      React.createElement('div', { className: 'react-modal__overlay', style: style.overlay }),
      React.createElement(
        'div',
        { className: 'react-modal__wrapper' },
        React.createElement(
          'div',
          { className: 'react-modal__wrapper__header' },
          React.createElement(
            'span',
            { style: style.close, onClick: this.hide },
            'X'
          ),
          title
        ),
        React.createElement(
          'div',
          { className: 'react-modal__wrapper__content' },
          this.props.children
        )
      )
    );
  }
});

module.exports = ReactModal;