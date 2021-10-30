// defining stuffs
require('dotenv/config');
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const error = require('./middlewares/errorHandler');
const route = require('./routers/index')
const cors = require('cors')
const PORT = process.env.PORT


app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())

app.use(route)

// error handler
app.use(error)

app.listen(PORT,() => {
    console.log(`Server running at port ${PORT}`)
})