/** @jsx React.DOM */

var React = require('react/addons');

var Status = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function() {
        return <div>
            Total mängd pengar: {this.props.totalmoney.toFixed(2)}<br/>
            Pengar: {this.props.money.toFixed(2)}<br/>
            Kb/s: {this.props.packetSpeed.toFixed(2)}
        </div>;
    }
});

module.exports = Status;