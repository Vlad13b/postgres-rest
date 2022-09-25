const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
  subscription: { type: DataTypes.STRING, defaultValue: "starter" },
    token: {type: DataTypes.STRING, defaultValue: null}
})

const Contacts = sequelize.define('contact', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING,},
    email: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING},
  favorite: { type: DataTypes.BOOLEAN, defaultValue: false }
})

User.hasMany(Contacts)
Contacts.belongsTo(User)

module.exports = {
  User, Contacts
}