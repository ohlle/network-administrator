/** @jsx React.DOM */

var React = require('react/addons');

var GameBoard = require('./GameBoard.jsx');


React.renderComponent(<GameBoard/>, document.getElementsByTagName("body")[0]);
