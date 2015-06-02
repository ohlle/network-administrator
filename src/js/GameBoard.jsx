/** @jsx React.DOM */

var React = require('react/addons');
var Equipment = require('./Equipment.jsx');
var Status = require('./Status.jsx');

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

module.exports = React.createClass({
    createNewEquipment: function(name, speed, amount, price) {
        var equipment = {
            name: name,
            speed: speed,
            amount: amount,
            price: price,
            game: this
        };
        equipment.buy = function() {
            if (equipment.game.state.money >= equipment.price) {
                equipment.game.state.money -= equipment.price;
                equipment.game.state.packetSpeed += equipment.speed;
                equipment.amount++;
                if(equipment.game.state.messageId == equipment.name) {
                    equipment.game.state.message = "";
                }
                equipment.price = equipment.price + Math.floor(equipment.price * 0.1);
                equipment.game.setState(
                    {
                        equipments: equipment.game.state.equipments
                    });
            }
        };
        return equipment;

    },
    displayName: "GameBoard",
    getInitialState: function() {
        var equipments = [];
//        equipments["hub"] = this.createNewEquipment("Hub",0.5,0,10);
        return {
            equipments: equipments,
            money:10000,
            packetSpeed:0
        }
    },
    tick: function() {
        var money = this.state.money + this.state.packetSpeed * 0.1;
        if (this.state.money > 10 && Object.size(this.state.equipments) == 0) {
            console.log("Adding hub!");
            this.state.equipments["Hub"] = this.createNewEquipment("Hub",0.5,0,10);
            this.setState({equipments:this.state.equipments, message: "Det är jobbigt att routa paket själv, köp en hub!", messageId: "Hub"});
        }
        this.setState({money:money});
    },
    routePacketManually: function() {
        this.setState({money:this.state.money + 1})
    },
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 500);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    render: function() {
        var equipments = [];
        for(var key in this.state.equipments) {
            var equipmentKey = key + "_equipment"
            equipments.push(<Equipment equipment={this.state.equipments[key]} key={equipmentKey} />);
        }
        return <div>
            <Status money={this.state.money} packetSpeed={this.state.packetSpeed}/>
            {this.state.message}< br/>
            <button onClick={this.routePacketManually}>Routa ett paket</button>
            {equipments}
        </div>;
    }
});