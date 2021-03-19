require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//Trying to get the Websocket up running. In the future getting //Websocket in the top and //webSocket End below.


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true })
const client = mongoose.connection
client.on('error', (error) => console.error(error))
client.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const plantsRouter = require('./routes/plantsRoute')
app.use("/plantsRoute", plantsRouter)

app.listen(3000, () => console.log('Server Started'))