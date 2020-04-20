const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//import routes
const postRoutes = require('./routes/posts')


// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:3000/",{useUnifiedTopology: true, useNewUrlParser: true}, () => 
//      console.log('connected to DBBB!')
// );

app.use('/posts', postRoutes);

// app.get('/', (req, res)=> {
//     res.send('we are on home')
// });


app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//connect to DB
//mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:3000/");

// const db = require('./config/keys').mongoURI;
// mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
//     .then(() =>{console.log('DDDDDDDone')})
//     .catch(err => console.log(err));




// Set up mongoose connection
// let dev_db_url = 'mongodb+srv://igo:igo@cluster0-dcrth.mongodb.net/test?retryWrites=true&w=majority';
// let mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{console.log('connected!!!!!!!!')});
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


mongoose.connect('mongodb://lei:lei@cluster0-shard-00-02-dcrth.mongodb.net:27017/test',{useUnifiedTopology: true, useNewUrlParser: true}, () => 
    console.log('connected to DBBB!')
);

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://igo:igo@cluster0-dcrth.mongodb.net/restapi?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("restapi").collection("rest");
//   // perform actions on the collection object
//   client.close();
// });



// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
//     );
//     next();
// })

app.listen(3000);