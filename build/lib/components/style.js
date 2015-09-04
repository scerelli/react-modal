'use strict';

module.exports = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 9998
  },

  modal: {},

  wrapper: {
    backgroundColor: '#fff',
    color: '#000',
    position: 'fixed',
    top: '20%',
    left: '10%',
    right: '10%',
    opacity: 0,
    boxShadow: '0.5px 0.866px 3px 0px rgb( 0, 0, 0 )',
    zIndex: 9999
  },

  wrapperContent: {
    padding: '16px 2%'
  },

  wrapperHeader: {
    padding: '16px 2%'
  },

  wrapperHeaderTitle: {
    margin: 0
  },

  close: {
    cursor: 'pointer',
    position: 'absolute',
    right: '16px',
    top: '16px'
  },

  animate: {},

  fade: {
    border: 'red'
  }
};