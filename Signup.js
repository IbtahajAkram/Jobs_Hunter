const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const connectionString = 'mongodb+srv://zawwar1313:SKemd6qGp8cvc3BT@cluster0.yf0z8hu.mongodb.net/user?retryWrites=true&w=majority';
const databaseName = 'user';
const collectionName = 'users';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/Home', (req, res) => {
    console.log('Accessing index.html route');
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/Signup', async (req, res) => {
    res.sendFile(path.join(__dirname , '..', 'frontend', 'Signup.html'));  ///'..', 'frontend', 
});


app.post('/Signuppp', async (req, res) => {
    try {
        const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const dataToInsert = req.body;
        const result = await collection.insertOne(dataToInsert);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

app.get('/Login' , async(req , res) => {
    try{
    const client = new MongoClient(connectionString,{ useNewUrlParser:true , useUnifiedTopology : true });
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const { email , password } = req.body;
    const result = await collection.findOne({ email });
    res.json(result);
    }catch(error){
        console.log('error');
        res.status(500).send('error');
    }
    });

app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
});
