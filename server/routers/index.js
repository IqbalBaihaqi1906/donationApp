const Router = require('express').Router()
const donate = require('./donate')

Router.get('/',(req,res) => {
    res.status(200).json({
        message : "Server is ready"
    })
})

Router.use(donate)

module.exports = Router