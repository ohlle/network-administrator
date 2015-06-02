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
            money:0,
            packetSpeed:0,
            totalmoney:0
        }
    },
    tick: function() {
        var money = this.state.money + this.state.packetSpeed * 1;
        var totalmoney = this.state.totalmoney + this.state.packetSpeed * 1;
        if (this.state.money > 10 && Object.size(this.state.equipments) == 0) {
            this.state.equipments["Telefonmodem"] = this.createNewEquipment("Telefonmodem",28.8,0,10);
            this.setState({equipments:this.state.equipments, message: "Det är jobbigt att routa paket själv, köp ett telefonmodem med 28.8k uppkoppling!", messageId: "Telefonmodem"});
        }
        if (this.state.money > 200 && this.state.equipments["Telefonmodem"].amount >= 10 && Object.size(this.state.equipments["ISDN"]) == 0) {
            this.state.equipments["ISDN"] = this.createNewEquipment("ISDN",128,0,200);
            this.setState({equipments:this.state.equipments, message: "Det fungerar bättre med ett ISDN modem, köp det!", messageId: "ISDN"});
        }
        if (this.state.money > 4000 && this.state.equipments["ISDN"].amount >= 10 && Object.size(this.state.equipments["ISDN Dual"]) == 0) {
            this.state.equipments["ISDN Dual"] = this.createNewEquipment("ISDN Dual",256,0,4000);
            this.setState({equipments:this.state.equipments, message: "Dom finns nu dubbelt så bra!", messageId: "ISDN Dual"});
        }
        if (this.state.money > 80000 && this.state.equipments["ISDN Dual"].amount >= 10 && Object.size(this.state.equipments["Hub"]) == 0) {
            this.state.equipments["Hub"] = this.createNewEquipment("Hub",2048,0,80000);
            this.setState({equipments:this.state.equipments, message: "Med en hub kommer resan bli fantastisk!", messageId: "Hub"});
        }

        this.setState({money:money});
        this.setState({totalmoney:totalmoney});
    },
    routePacketManually: function() {
        this.setState({money:this.state.money + 1});
        this.setState({totalmoney:this.state.totalmoney + 1});
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
            var equipmentKey = key + "_equipment";
            equipments.push(<Equipment equipment={this.state.equipments[key]} key={equipmentKey} />);
        }
        return <div>
            <Status money={this.state.money} totalmoney={this.state.totalmoney} packetSpeed={this.state.packetSpeed}/>
            {this.state.message}< br/>
            <button onClick={this.routePacketManually}>Routa ett paket</button>
            {equipments}
        </div>;
    }
});