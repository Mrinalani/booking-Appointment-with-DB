const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'Vikas1998',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;