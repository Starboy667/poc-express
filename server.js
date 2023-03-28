const express = require('express');
var bodyParser = require('body-parser')
const mongodb = require('mongodb');
require("dotenv").config();

const client = new mongodb.MongoClient(process.env.MONGODB_URI);
const db = client.db("users");
const app = express();
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
});

app.post('/register', (req, res) => {
    if (req.body === undefined) {
        res.status(400).send('No data')
    }
    if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(400).send('Missing username or password');
    }
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    collection = db.collection('users');
    collection.findOne({username: user.username}, function(err, result) {
        if (err) throw err;
    }).then((result) => {
        if (result !== null) {
            return res.status(200).send('User already exists');
        }
        collection.insertOne(user, function(err, result) {
            if (err) throw err;
        }).then(() => {
            return res.status(200).send('User created');
        });
    });
});

app.post('/login', (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('No data');
    }
    if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(400).send('Missing username or password');
    }
    collection = db.collection('users');
    collection.findOne({username: req.body.username, password: req.body.password}, function(err, result) {
        if (err) throw err;
    }
    ).then((result) => {
        if (result === null) {
            return res.status(400).send('User not found');
        }
        return res.status(200).send('User found');
    });
});

module.exports = app.listen(3000, () => {
    console.log('Server started on port 3000');
});

