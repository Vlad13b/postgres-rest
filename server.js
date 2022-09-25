const app = require('./app')
const sequelize = require('./db')
require('dotenv').config()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(5001, () => console.log('Server started on port 5001'))
    } catch (e) {
        console.log(e)
    }
}

start()
