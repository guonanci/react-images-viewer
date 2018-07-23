'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ===================
// Theme
// ===================

var theme = {};

// container
theme.container = {
  background: 'rgba(0, 0, 0, .8)',
  gutter: {
    horizontal: 10,
    vertical: 10
  },
  zIndex: 2001

  // header
};theme.header = {
  height: 40
};
theme.close = {
  fill: 'white'

  // footer
};theme.footer = {
  color: '#fff',
  count: {
    color: 'rgba(255, 255, 255, .75)',
    fontSize: '.85em'
  },
  height: 40,
  gutter: {
    horizontal: 0,
    vertical: 5
  }

  // thumbnails
};theme.thumbnail = {
  activeBorderColor: '#fff',
  size: 50,
  gutter: 2

  // arrow
};theme.arrow = {
  background: 'none',
  fill: '#fff',
  height: 120
};

exports.default = theme;