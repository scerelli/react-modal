'use strict';

var $ = require('jquery');
var React = require('react');
var _ = require('underscore');

//Modal Style
var style = require('./style');

var ReactModal = React.createClass({
  displayName: 'ReactModal',

  mixins: [React.Animate],
  propTypes: {
    title: React.PropTypes.string,

    beforeOpen: React.PropTypes.func,
    beforeClose: React.PropTypes.func,
    afterOpen: React.PropTypes.func,
    afterClose: React.PropTypes.func,

    //stylishProps
    overlayOpacity: React.PropTypes.string, //overlay
    topZindex: React.PropTypes.string, //modal
    animModal: React.PropTypes.bool, //modal
    animName: React.PropTypes.string, //modal
    animDuration: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      title: '',
      loadStyle: true,
      animName: 'fade',
      animModal: true,
      animDuration: 300

    };
  },

  getInitialState: function getInitialState() {
    return {
      isVisible: false
    };
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (this.props.animModal) {
      this.animate(nextState);
    }

    if (nextState.isVisible && !this.state.isVisible && this.props.beforeOpen) {
      this.props.beforeOpen();
    }

    if (!nextState.isVisible && this.state.isVisible && this.props.beforeClose) {
      this.props.beforeClose();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (!prevState.isVisible && this.state.isVisible && this.props.afterOpen) {
      this.props.afterOpen();
    }

    if (prevState.isVisible && !this.state.isVisible && this.props.afterClose) {
      this.props.afterClose();
    }
  },

  animate: function animate(nextState) {
    var $modal = $(this.getDOMNode()).find('.react-modal__wrapper');
    var opacity = nextState.isVisible ? 1 : 0;

    $modal.animate({
      opacity: opacity
    }, this.props.animDuration);
  },

  show: function show() {
    this.setState({ isVisible: true });
  },

  hide: function hide() {
    this.setState({ isVisible: false });
  },

  render: function render() {
    var title;
    //svg code for the close button, this will not be processed by react of course.
    var closeIcon = '<svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"> <g> <defs> <rect id="SVGID_1_" width="24" height="24"/> </defs> <clipPath id="SVGID_2_"> <use xlink:href="#SVGID_1_"  overflow="visible"/> </clipPath> <path clip-path="url(#SVGID_2_)" d="M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59 L13.41,12L16,9.41L14.59,8z M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10c5.53,0,10-4.47,10-10C22,6.47,17.53,2,12,2 M12,20 c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20"/></g></svg>';

    title = this.props.title ? React.createElement(
      'h2',
      { className: 'react-modal__wrapper__header__title', style: style.wrapperHeaderTitle },
      this.props.title
    ) : '';

    if (this.state.isVisible) {
      style.modal.display = 'block';
    } else if (!this.state.isVisible) {
      style.modal.display = 'none';
    }

    return React.createElement(
      'div',
      { className: 'react-modal', style: style.modal },
      React.createElement('div', { className: 'react-modal__overlay', style: style.overlay, onClick: this.hide }),
      React.createElement(
        'div',
        { className: 'react-modal__wrapper', style: style.wrapper },
        React.createElement(
          'div',
          { className: 'react-modal__wrapper__header', style: style.wrapperHeader },
          React.createElement('span', { className: 'react-modal__wrapper__header__close', style: style.close, onClick: this.hide, dangerouslySetInnerHTML: { __html: closeIcon } }),
          title
        ),
        React.createElement(
          'div',
          { className: 'react-modal__wrapper__content', style: style.wrapperContent },
          this.props.children
        )
      )
    );
  }
});

module.exports = ReactModal;