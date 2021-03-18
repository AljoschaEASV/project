require('dotenv').config()

const express = require('express')
const ws = require('ws')
const app = express()
const mongoose = require('mongoose')

//Trying to get the Websocket up running. In the future getting //Websocket in the top and //webSocket End below.
const http = require('http');

const httpServer = http.createServer((req, res) => {
    //starts a get Update for Websocket
    console.log("We have recieved a request ")
})

http


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true })
const client = mongoose.connection
client.on('error', (error) => console.error(error))
client.once('open', () => console.log('Connected to Database'))

app.use(express.json())

client.connect(err => {
    const collection = client.db("test").collection("devices");
    collection.new
    client.close();
});

const plantsRouter = require('./routes/plantsRoute')
app.use("/plantsRoute", plantsRouter)

app.listen(3000, () => console.log('Server Started'))