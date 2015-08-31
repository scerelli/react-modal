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

    title = this.props.title ? (<h2 className="react-modal__wrapper__header__title">{this.props.title}</h2>) : '';

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
        <div className="react-modal__overlay" style={style.overlay}></div>
        <div className="react-modal__wrapper">
          <div className="react-modal__wrapper__header">
            <span style={style.close} onClick={this.hide}>X</span>
            {title}
          </div>
          <div className="react-modal__wrapper__content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ReactModal;
