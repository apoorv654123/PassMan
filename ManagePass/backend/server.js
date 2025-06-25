const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'ManagePass';
const app = express()
const port = 3001
app.use(bodyparser.json());
app.use(cors());

console.log(process.env.MONGO_URI) 


app.get('/', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection= db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    // res.send('Hello World!')
    res.json(findResult);
    })
    
//Save Password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection= db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result: findResult});
    })

//Delete a Password by id
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection= db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result: findResult});
    })
    
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`)
    })
    
    