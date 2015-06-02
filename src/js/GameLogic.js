/** @jsx React.DOM */

var React = require('react/addons');

var GameLogic = {
    changeListener: {},
    i: 0,
    createNewEquipment: function(name, speed, amount,price) {
        var equipment = {
            name: name,
            speed: speed,
            amount: amount,
            price: price,
            view: function() {
                console.log(amount);
            }
        };
        equipment.buy = function() {
            equipment.amount++;
        };
        return equipment;

    },
    equipments: [],

    tick: function() {
        this.changeListener(this.equipments)
    },
    setChangeListener: function(changeListener) {
        this.changeListener = changeListener;
        this.changeListener(this.equipments);
    }
};
//GameLogic.equipments.push(GameLogic.createNewEquipment("Hub",0.5,0));
//GameLogic.equipments.push(GameLogic.createNewEquipment("Switch",1,0));

module.exports = GameLogic;