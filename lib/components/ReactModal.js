var $                       = require('jquery');
var React                   = require('react');
var _                       = require('underscore');


//Modal Style
var style         = require('./style');

var ReactModal = React.createClass({
  mixins: [React.Animate],
  propTypes: {
    title       : React.PropTypes.string,

    beforeOpen  : React.PropTypes.func,
    beforeClose : React.PropTypes.func,
    afterOpen   : React.PropTypes.func,
    afterClose  : React.PropTypes.func,

    //stylishProps
    overlayOpacity: React.PropTypes.string, //overlay
    topZindex     : React.PropTypes.string, //modal
    animModal     : React.PropTypes.bool, //modal
    animName      : React.PropTypes.string, //modal
    animDuration  : React.PropTypes.number
  },

  getDefaultProps: function () {
      return {
        title        : '',
        loadStyle    : true,
        animName     : 'fade',
        animModal    : true,
        animDuration : 300

      }
  },

  getInitialState: function() {
    return {
      isVisible: false
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if(this.props.animModal) {
      this.animate(nextState);
    }

    if(this.props.beforeClose && this.state.isVisible && !nextState.isVisible) {
      this.props.beforeClose();
    }

    if(this.props.beforeOpen && !this.state.isVisible && nextState.isVisible) {
      this.props.beforeOpen();
    }
  },

  componentDidUpdate: function(props, prevState) {
    if(this.props.afterClose && this.state.isVisible && !prevState.isVisible) {
      this.props.afterClose();
    }

    if(this.props.afterOpen && !this.state.isVisible && prevState.isVisible) {
      this.props.afterOpen();
    }
  },

  animate: function(nextState) {
    var $modal = $(this.getDOMNode()).find('.react-modal__wrapper');
    var opacity = nextState.isVisible ? 1 : 0;

    nextState.isVisible

    $modal.animate({
      opacity: opacity
    }, this.props.animDuration);
  },

  show: function() {
    this.setState({isVisible: true});
  },

  hide: function() {
    this.setState({isVisible: false});
  },

  render: function() {
    var title;

    title = this.props.title ? (<h2 className="react-modal__wrapper__header__title" style={style.wrapperHeaderTitle}>{this.props.title}</h2>) : '';

    if(this.state.isVisible) {
      style.modal.display = 'block'
    }else if(!this.state.isVisible){
      style.modal.display = 'none'
    }

    return (
      <div className="react-modal" style={style.modal}>
        <div className="react-modal__overlay" style={style.overlay} onClick={this.hide}></div>
        <div className="react-modal__wrapper" style={style.wrapper}>
          <div className="react-modal__wrapper__header" style={style.wrapperHeader}>
            <span style={style.close} onClick={this.hide}>X</span>
            {title}
          </div>
          <div className="react-modal__wrapper__content" style={style.wrapperContent}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ReactModal;
