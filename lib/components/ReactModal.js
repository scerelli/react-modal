var $     = require('jquery');
var React = require('react');
var _     = require('underscore');
var style = require('./style');

var ReactModal = React.createClass({
  mixins: [React.Animate],

  propTypes: {
    title       : React.PropTypes.string,
    closeIcon   : React.PropTypes.string,
    exitKeys    : React.PropTypes.array,
    beforeOpen  : React.PropTypes.func,
    beforeClose : React.PropTypes.func,
    afterOpen   : React.PropTypes.func,
    afterClose  : React.PropTypes.func,

    //stylishProps
    overlayOpacity: React.PropTypes.string,
    animModal     : React.PropTypes.bool,
    animDuration  : React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      title       : '',
      animModal   : true,
      animDuration: 300,
      closeIcon   : '<svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"> <g> <defs> <rect id="SVGID_1_" width="24" height="24"/> </defs> <clipPath id="SVGID_2_"> <use xlink:href="#SVGID_1_"  overflow="visible"/> </clipPath> <path clip-path="url(#SVGID_2_)" d="M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59 L13.41,12L16,9.41L14.59,8z M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10c5.53,0,10-4.47,10-10C22,6.47,17.53,2,12,2 M12,20 c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20"/></g></svg>',
      exitKeys    : [27]
    }
  },

  getInitialState: function() {
    return {
      isVisible: false
    }
  },

  componentDidMount: function() {
    $(document).on('keydown', function(e) {
      if(~this.props.exitKeys.indexOf(e.keyCode) && this.state.isVisible) {
        this.hide();
      }
    }.bind(this));
  },

  componentWillUpdate: function (nextProps, nextState) {
    if(nextState.isVisible && !this.state.isVisible && this.props.beforeOpen) {
      this.props.beforeOpen();
    }

    if(!nextState.isVisible && this.state.isVisible && this.props.beforeClose) {
      this.props.beforeClose();
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if(!prevState.isVisible && this.state.isVisible && this.props.afterOpen) {
      this.props.afterOpen();
    }

    if(prevState.isVisible && !this.state.isVisible && this.props.afterClose) {
      this.props.afterClose();
    }
  },

  animate: function(modalState) {
    var $modal  = $(this.getDOMNode()).find('.react-modal__wrapper, .react-modal__overlay');
    var opacity = modalState ? 1 : 0;

    if(modalState) {
      this.setState({isVisible: modalState});
    }

    $modal.animate({
      opacity: opacity
    }, this.props.animDuration, function() {
      if(!modalState) {
        this.setState({isVisible: false});
      }
    }.bind(this));
  },

  show: function() {
    if(this.props.animModal) {
      this.animate(true);
    } else {
      this.setState({isVisible: true});
    }
  },

  hide: function() {
    if(this.props.animModal) {
      this.animate(false);
    } else {
      this.setState({isVisible: false});
    }
  },

  testfunc: function(e) {
    console.log(e);
  },

  render: function() {
    var title = this.props.title ? (<h2 className="react-modal__wrapper__header__title" style={style.wrapperHeaderTitle}>{this.props.title}</h2>) : '';
    style.modal.display = this.state.isVisible ? 'block' : 'none'

    return (
      <div className="react-modal" style={style.modal}>
        <div className="react-modal__overlay" style={style.overlay} onClick={this.hide}></div>
        <div className="react-modal__wrapper" style={style.wrapper}>
          <div className="react-modal__wrapper__header" style={style.wrapperHeader}>
            <span className="react-modal__wrapper__header__close" style={style.close} onClick={this.hide} dangerouslySetInnerHTML={{__html: this.props.closeIcon}}></span>
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
