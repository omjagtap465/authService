const express = require('express')
const apiRoutes = require('./routes')
const bodyParser = require('body-parser');
const app = express()
const { ServerConfig } = require('./config');
const db = require('./models/index')
const {User,Role} = require('./models/index')
console.log(ServerConfig.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes)
app.listen(ServerConfig.PORT,async (req, res) => {
    console.log(ServerConfig.JWT);
    // db.sequelize.sync({alter:true})
    // const u1 =await User.findByPk(1)
    // const r1 =await Role.findByPk(1)
    // u1.addRole(r1)
    console.log(`Sucessfully started the server on ${ServerConfig.PORT}`);
})