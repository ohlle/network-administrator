/** @jsx React.DOM */

var React = require('react/addons');

var Status = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function() {
        return <div>
            Pengar: {this.props.money.toFixed(2)}<br/>
            Mb/s: {this.props.packetSpeed}
        </div>;
    }
});

module.exports = Status;