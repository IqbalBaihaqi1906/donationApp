const donateRoute = require('express').Router()
const donateController = require('../controllers/donate')
const salesforce = require('../middlewares/salesforce')

donateRoute.get('/donate',salesforce,donateController.get)


module.exports = donateRoute