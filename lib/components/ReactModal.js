var React         = require('react');
var _             = require('underscore');

//Modal Style
var style         = require('./style');

var ReactModal = React.createClass({
  propTypes: {
    title       : React.PropTypes.string,
    modalPrefix : React.PropTypes.string,
    beforeOpen  : React.PropTypes.func,
    beforeClose : React.PropTypes.func,
    afterOpen   : React.PropTypes.func,
    afterClose  : React.PropTypes.func,
    loadStyle   : React.PropTypes.bool,
    //stylishProps
    overlayOpacity: React.PropTypes.string, //overlay
    topZindex     : React.PropTypes.string, //modal
    animateModal  : React.PropTypes.bool, //modal
    animationType : React.PropTypes.bool //modal
  },

  getDefaultProps: function () {
      return {
        title       : '',
        loadStyle   : true
      }
  },

  getInitialState: function() {
    return {
      isVisible: false
    }
  },

  componentWillUpdate: function(props, state) {
    if(this.props.beforeClose && this.state.isVisible && !state.isVisible) {
      this.props.beforeClose();
    }

    if(this.props.beforeOpen && !this.state.isVisible && state.isVisible) {
      this.props.beforeOpen();
    }
  },

  componentDidUpdate: function(props, state) {
    if(this.props.afterClose && this.state.isVisible && !state.isVisible) {
      this.props.afterClose();
    }

    if(this.props.afterOpen && !this.state.isVisible && state.isVisible) {
      this.props.afterOpen();
    }
  },

  show: function() {
    this.setState({isVisible: true});
  },

  hide: function() {
    this.setState({isVisible: false});
  },

  render: function() {
    var animation;
    var animationType;
    var title;

    title = this.props.title ? (<h2 className="react-modal__wrapper__header__title" style={style.wrapperHeaderTitle}>{this.props.title}</h2>) : '';

    if(this.state.isVisible) {
      style.modal.display = 'block'
    }else if(!this.state.isVisible){
      style.modal.display = 'none'
    }

    if(this.props.animateModal) {
      switch(this.props.animationType){
        case 'fade':
          animationType = style.fade
          break;
        default:
          animationType = style.fade
          break;
      }
      animation = _extend(style.animate, animationType);
    }

    return (
      <div className="react-modal" style={animation, style.modal}>
        <div className="react-modal__overlay" style={style.overlay} onClick={this.hide}></div>
        <div className="react-modal__wrapper" style={animation, style.wrapper}>
          <div className="react-modal__wrapper__header" style={style.wrapperHeader}>
            <span style={style.close} onClick={this.hide}>X</span>
            {title}
          </div>
          <div className="react-modal__wrapper__content" style={animation, style.wrapperContent}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ReactModal;
