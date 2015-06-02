/** @jsx React.DOM */

var React = require('react/addons');

var Equipment = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function() {
        return <div>{this.props.equipment.name}: {this.props.equipment.amount} <button onClick={this.props.equipment.buy}>Köp 1</button> ({this.props.equipment.price})
        </div>;
    }
});

module.exports = Equipment;