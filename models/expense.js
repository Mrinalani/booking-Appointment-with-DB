const Sequelize = require('sequelize');

const sequelise = require('../util/database');

const Expense = sequelise.define('expense',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ProductName:{
       type:Sequelize.STRING,
       allowNull: false,
    },
    orderId:{
        type:Sequelize.INTEGER,
        allowNull: false, 
    },
    sellingPrice:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
})

module.exports = Expense;